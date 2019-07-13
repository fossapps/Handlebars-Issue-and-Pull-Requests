import {WebhookPayloadIssuesIssueLabelsItem} from "@octokit/webhooks";
import * as Webhooks from "@octokit/webhooks";
import {compile} from "handlebars";
import {Application, Context} from "probot";

export interface ITemplateVars {
    id: number;
    user: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
    };
    issueData?: {
        // I couldn't find anything for issue data which might be relevant, please create a issue
        // todo: document this and remove this comment instead
    };
    pullData?: {
        html_url: string;
        diff_url: string;
        patch_url: string;
        issue_url: string;
    };
    labels: WebhookPayloadIssuesIssueLabelsItem[];
}

type TData = Webhooks.WebhookPayloadPullRequest | Webhooks.WebhookPayloadIssues;

// tslint:disable-next-line:no-unnecessary-class
export class App {
    public static handle(context: Application): void {
        context.on("pull_request.opened", App.handleEvent);
        context.on("issues.opened", App.handleEvent);
    }

    private static isPr(data: TData): data is Webhooks.WebhookPayloadPullRequest {
        return "pull_request" in data;
    }

    private static async handleEvent(context: Context<TData>): Promise<void> {
        context.log.info("handling event");
        const body = App.getBody(context.payload);
        const templateVars = App.getTemplateVars(context.payload);
        context.log.info("template vars:", templateVars);
        const newBody = App.getCompiledBody(body, templateVars);
        if (App.isPr(context.payload)) {
            await context.github.pulls.update(context.issue({body: newBody}));
            context.log.info("updated PR body");
        } else {
            await context.github.issues.update(context.issue({body: newBody}));
            context.log.info("updated ISSUE body");
        }
    }

    private static getTemplateVars(data: TData): ITemplateVars {
        return App.isPr(data)
            ? App.getPrVars(data)
            : App.getIssueVars(data);
    }

    private static getCompiledBody(body: string, vars: ITemplateVars): string {
        const template = compile<ITemplateVars>(body);
        return template(vars);
    }

    private static getPrVars(data: Webhooks.WebhookPayloadPullRequest): ITemplateVars {
        return {
            id: data.pull_request.number,
            labels: data.pull_request.labels,
            user: data.pull_request.user,
            pullData: {
                diff_url: data.pull_request.diff_url,
                html_url: data.pull_request.html_url,
                issue_url: data.pull_request.issue_url,
                patch_url: data.pull_request.patch_url
            }
        };
    }

    private static getIssueVars(data: Webhooks.WebhookPayloadIssues): ITemplateVars {
        return {
            id: data.issue.number,
            user: data.issue.user,
            labels: data.issue.labels,
            issueData: {}
        };
    }

    private static getBody(data: TData): string {
        if (App.isPr(data)) {
            return data.pull_request.body;
        }
        return data.issue.body;
    }
}
