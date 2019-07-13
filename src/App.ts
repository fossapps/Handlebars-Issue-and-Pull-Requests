import * as Webhooks from "@octokit/webhooks";
import {Application, Context} from "probot";
import {GithubIssueHelper, IGithubIssueHelper} from "./GithubIssueHelper";
import {IPayloadHelper, PayloadHelper} from "./PayloadHelper";

export type TData = Webhooks.WebhookPayloadPullRequest | Webhooks.WebhookPayloadIssues;

// tslint:disable-next-line:no-unnecessary-class
export class App {
    constructor(private ghHelper: IGithubIssueHelper, private payloadHelper: IPayloadHelper, private context: Context<TData>) {
    }

    public static handle(context: Application): void {
        context.on("pull_request.opened", App.handleEvent);
        context.on("issues.opened", App.handleEvent);
    }

    private static handleEvent(context: Context<TData>): Promise<void> {
        const app = new App(new GithubIssueHelper(context.github, PayloadHelper.isPr(context.payload)), new PayloadHelper(context), context);
        return app.handleEvent();
    }

    private static getErrorComment(error: Error): string {
        const message = (error.stack) ? error.stack!.split("\n").join("\n>") : error.toString();
        return `## There was error processing your body

The exact error message is the following

${message}

This body won't be processed any further, please fix your template.
`;
    }

    public async handleEvent(): Promise<void> {
        try {
            const newBody = this.payloadHelper.getNewBody();
            await this.ghHelper.updateBody(this.context.issue({body: newBody}));
            this.context.log.debug(`updated ${PayloadHelper.isPr(this.context.payload) ? "PR" : "issue"} body`);
        } catch (e) {
            this.context.log.info(`Error: ${e.toString()}`);
            console.warn(`Error: ${e.toString()}`);
            await this.ghHelper.comment(this.context.issue({body: App.getErrorComment(e)}));
        }
    }
}
