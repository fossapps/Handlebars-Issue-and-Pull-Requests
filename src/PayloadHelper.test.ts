import * as Webhooks from "@octokit/webhooks";
import {Context} from "probot";
import {ITemplateVars, PayloadHelper} from "./PayloadHelper";

describe("PayloadHelper", () => {

    it("should be able to get body for issue", () => {
        const context: Context<Webhooks.WebhookPayloadIssues> = {
            payload: {
                // @ts-ignore
                issue: {
                    body: "test body"
                }
            }
        };
        const payloadHelper = new PayloadHelper(context);
        expect(payloadHelper.getBodyFromPayload()).toEqual("test body");
    });

    it("should be able to get body for pull request", () => {
        const context: Context<Webhooks.WebhookPayloadPullRequest> = {
            payload: {
                // @ts-ignore
                pull_request: {
                    body: "created new PR"
                }
            }
        };
        const payloadHelper = new PayloadHelper(context);
        expect(payloadHelper.getBodyFromPayload()).toEqual("created new PR");
    });

    describe("getTemplateVars", () => {
        it("should be able to return issue variables", () => {
            const context: Context<Webhooks.WebhookPayloadIssues> = {
                payload: {
                    // @ts-ignore
                    issue: {
                        body: "body",
                        number: 2,
                        labels: []
                    },
                    // @ts-ignore
                    sender: {
                        avatar_url: "https://github.com/avatar.jpg",
                        login: "cyberhck",
                        url: "https://github.com/cyberhck",
                        id: 12345
                    }
                }
            };
            const helper = new PayloadHelper(context);
            const expectedData: ITemplateVars = {
                id: 2,
                issueData: {},
                labels: [],
                user: {
                    avatar_url: "https://github.com/avatar.jpg",
                    id: 12345,
                    login: "cyberhck",
                    url: "https://github.com/cyberhck"
                }
            };
            expect(helper.getTemplateVariables()).toStrictEqual(expectedData);
        });
        it("should be able to return pull request variables", () => {
            const context: Context<Webhooks.WebhookPayloadPullRequest> = {
                payload: {
                    // @ts-ignore
                    pull_request: {
                        body: "pr_body",
                        number: 5,
                        labels: [],
                        patch_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1.patch",
                        issue_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1",
                        html_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1",
                        diff_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1.diff"
                    },
                    // @ts-ignore
                    sender: {
                        avatar_url: "https://github.com/avatar.jpg",
                        login: "cyberhck",
                        url: "https://github.com/cyberhck",
                        id: 12345
                    }
                }
            };
            const expectedData: ITemplateVars = {
                user: {
                    avatar_url: "https://github.com/avatar.jpg",
                    id: 12345,
                    login: "cyberhck",
                    url: "https://github.com/cyberhck"
                },
                labels: [],
                pullData: {
                    patch_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1.patch",
                    issue_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1",
                    html_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1",
                    diff_url: "https://github.com/fossapps/Handlebars-Issue-and-Pull-Requests/pull/1.diff"
                },
                id: 5
            };
            const helper = new PayloadHelper(context);
            expect(helper.getTemplateVariables()).toStrictEqual(expectedData);
        });
    });

    describe("PayloadHelper.isPr", () => {
        it("should be able to determine if payload is for a pull request or not", () => {
            const prContext: Context<Webhooks.WebhookPayloadPullRequest> = {
                payload: {
                    // @ts-ignore
                    pull_request: {}
                }
            };
            expect(PayloadHelper.isPr(prContext.payload)).toBeTruthy();

            const issueContext: Context<Webhooks.WebhookPayloadIssues> = {
                payload: {
                    // @ts-ignore
                    issue: {}
                }
            };
            expect(PayloadHelper.isPr(issueContext.payload)).toBeFalsy();
        });
    });

    describe("getNewBody should be able to get rendered body", () => {
        const context: Context<Webhooks.WebhookPayloadIssues> = {
            payload: {
                // @ts-ignore
                issue: {
                    body: "created new PR number {{id}} by {{user.login}}",
                    number: 2,
                    labels: []
                },
                // @ts-ignore
                sender: {
                    avatar_url: "https://github.com/avatar.jpg",
                    login: "cyberhck",
                    url: "https://github.com/cyberhck",
                    id: 12345
                }
            }
        };
        const payloadHelper = new PayloadHelper(context);
        expect(payloadHelper.getNewBody()).toEqual("created new PR number 2 by cyberhck");
    });
});
