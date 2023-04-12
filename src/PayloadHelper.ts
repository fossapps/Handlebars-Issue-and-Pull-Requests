import {WebhookPayloadIssuesIssueLabelsItem} from "@octokit/webhooks";
import * as Webhooks from "@octokit/webhooks";
import {Context} from "probot";
import {TData} from "./App";
import {HandlebarCompiler} from "./HandlebarCompiler";

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
        branch: string;
    };
    labels: WebhookPayloadIssuesIssueLabelsItem[];
}

export interface IPayloadHelper {
    getNewBody(): string;
}

export class PayloadHelper implements IPayloadHelper {
    constructor(private context: Context<TData>) {
    }

    public static isPr(payload: TData): payload is Webhooks.WebhookPayloadPullRequest {
        return "pull_request" in payload;
    }

    private static getIssueVariables(issuePayload: Webhooks.WebhookPayloadIssues): ITemplateVars {
        return {
            id: issuePayload.issue.number,
            labels: issuePayload.issue.labels,
            issueData: {},
            user: issuePayload.sender
        };
    }

    private static getPrVariables(prPayload: Webhooks.WebhookPayloadPullRequest): ITemplateVars {
        return {
            id: prPayload.pull_request.number,
            labels: prPayload.pull_request.labels,
            user: prPayload.sender,
            pullData: {
                diff_url: prPayload.pull_request.diff_url,
                html_url: prPayload.pull_request.html_url,
                issue_url: prPayload.pull_request.issue_url,
                patch_url: prPayload.pull_request.patch_url,
                branch: prPayload.pull_request.head.ref
            }
        };
    }

    public getTemplateVariables(): ITemplateVars {
        return (PayloadHelper.isPr(this.context.payload))
            ? PayloadHelper.getPrVariables(this.context.payload)
            : PayloadHelper.getIssueVariables(this.context.payload);
    }

    public getNewBody(): string {
        const templateVars = this.getTemplateVariables();
        const newBody = this.getBodyFromPayload();
        const compiler = new HandlebarCompiler(newBody);
        return compiler.render(templateVars);
    }

    public getBodyFromPayload(): string {
        return (PayloadHelper.isPr(this.context.payload)
            ? this.context.payload.pull_request.body
            : this.context.payload.issue.body) || "";
    }

}
