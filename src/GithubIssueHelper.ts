import {Octokit} from "probot";
import {GitHubAPI} from "probot/lib/github";
export interface IPayload {
    number: number;
    owner: string;
    repo: string;
    body: string;
}

export interface IGithubIssueHelper {
    updateBody(payload: IPayload): Promise<Octokit.Response<Octokit.PullsUpdateResponse | Octokit.IssuesUpdateResponse>>;
    comment(payload: IPayload): Promise<Octokit.Response<Octokit.PullsCreateCommentResponse | Octokit.IssuesCreateCommentResponse>>;
}

export class GithubIssueHelper implements IGithubIssueHelper {
    constructor(private github: GitHubAPI, private isPr: boolean) {}
    public async updateBody(payload: IPayload): Promise<Octokit.Response<Octokit.PullsUpdateResponse | Octokit.IssuesUpdateResponse>> {
        return this.isPr ? this.updatePrBody(payload) : this.updateIssueBody(payload);
    }

    public comment(payload: IPayload): Promise<Octokit.Response<Octokit.PullsCreateCommentResponse | Octokit.IssuesCreateCommentResponse>> {
        return this.github.issues.createComment(payload);
    }

    private async updatePrBody(newBody: IPayload): Promise<Octokit.Response<Octokit.PullsUpdateResponse>> {
        return this.github.pulls.update(newBody);
    }

    private async updateIssueBody(newBody: IPayload): Promise<Octokit.Response<Octokit.IssuesUpdateResponse>> {
        return this.github.issues.update(newBody);
    }
}
