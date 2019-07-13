import {GitHubAPI} from "probot/lib/github";
import {GithubIssueHelper} from "./GithubIssueHelper";

describe("GithubIssueHelper", () => {
    it("should be able to update body of pr", async () => {
        const fn: any = jest.fn();
        const mockGithubApi: GitHubAPI = {
            // @ts-ignore
            pulls: {
                update: fn
            }
        };
        const bodyUpdater = new GithubIssueHelper(mockGithubApi, true);
        await bodyUpdater.updateBody({number: 12, owner: "cyberhck", repo: "", body: ""});
        expect(fn).toHaveBeenCalled();
    });
    it("should be able to update body of issue", async () => {
        const fn: any = jest.fn();
        const mockGithubApi: GitHubAPI = {
            // @ts-ignore
            issues: {
                update: fn
            }
        };
        const bodyUpdater = new GithubIssueHelper(mockGithubApi, false);
        await bodyUpdater.updateBody({number: 12, owner: "cyberhck", repo: "", body: ""});
        expect(fn).toHaveBeenCalled();
    });
    it("should be able to comment on pr or issue", async () => {
        const fn: any = jest.fn();
        const mockGithubApi: GitHubAPI = {
            // @ts-ignore
            issues: {
                createComment: fn
            }
        };
        const issueHelperWhenPr = new GithubIssueHelper(mockGithubApi, true);
        await issueHelperWhenPr.comment({body: "", number: 5, owner: "", repo: ""});
        expect(fn).toHaveBeenCalled();
        const issueHelper = new GithubIssueHelper(mockGithubApi, false);
        fn.mockClear();
        await issueHelper.comment({body: "", number: 5, owner: "", repo: ""});
        expect(fn).toHaveBeenCalled();
    });
});
