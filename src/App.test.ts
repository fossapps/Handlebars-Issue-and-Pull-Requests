import {App} from "./App";
import {IGithubIssueHelper, IPayload} from "./GithubIssueHelper";
import {IPayloadHelper} from "./PayloadHelper";

describe("App", () => {
    it("should be defined", () => {
        expect(App).toBeDefined();
        expect(App.handle).toBeDefined();
    });

    it("registers handler for pull_request.opened and issue.opened", () => {
        const spy = jest.fn();
        App.handle({on: spy} as any);
        expect(spy).toHaveBeenCalled();
    });

    it("should be able to edit pull request body correctly", async () => {
        const payloadHelperMock: IPayloadHelper = {
            getNewBody: () => "new body with different data",
            getOriginalBody: () => "old body with original data"
        };
        const updateMock = jest.fn();
        const ghHelper: IGithubIssueHelper = {
            comment: () => undefined as any,
            updateBody: updateMock
        };
        const log = jest.fn();
        const mockContext = {
            payload: {
                pull_request: {}
            },
            issue: (payload: { body: string }): IPayload => ({
                number: 1,
                repo: "",
                owner: "",
                body: payload.body
            }),
            log: {
                debug: log
            }
        };
        const app = new App(ghHelper, payloadHelperMock, mockContext as any);
        await app.handleEvent();
        expect(log).toHaveBeenCalled();
        expect(updateMock).toHaveBeenCalledWith({body: "new body with different data", number: 1, owner: "", repo: ""});
    });

    it("should be able to edit issue body correctly", async () => {
        const payloadHelperMock: IPayloadHelper = {
            getNewBody: () => "new body with different data",
            getOriginalBody: () => "old body with original data"
        };
        const updateMock = jest.fn();
        const ghHelper: IGithubIssueHelper = {
            comment: () => undefined as any,
            updateBody: updateMock
        };
        const log = jest.fn();
        const mockContext = {
            payload: {
                issue: {}
            },
            issue: (payload: { body: string }): IPayload => ({
                number: 1,
                repo: "",
                owner: "",
                body: payload.body
            }),
            log: {
                debug: log
            }
        };
        const app = new App(ghHelper, payloadHelperMock, mockContext as any);
        await app.handleEvent();
        expect(log).toHaveBeenCalled();
        expect(updateMock).toHaveBeenCalledWith({body: "new body with different data", number: 1, owner: "", repo: ""});
    });

    it("should create a issue comment if there's error with handlebar", async () => {
        const payloadHelperMock: IPayloadHelper = {
            getNewBody: () => {
                throw new Error("Error");
            },
            getOriginalBody: () => "old body with original data"
        };
        const commentMock = jest.fn();
        const ghHelper: IGithubIssueHelper = {
            comment: commentMock,
            updateBody: () => undefined as any
        };
        const log = jest.fn();
        const mockContext = {
            payload: {
                issue: {}
            },
            issue: (payload: { body: string }): IPayload => ({
                number: 1,
                repo: "",
                owner: "",
                body: payload.body
            }),
            log: {
                debug: log,
                info: () => undefined as any
            }
        };
        const app = new App(ghHelper, payloadHelperMock, mockContext as any);
        await app.handleEvent();
        expect(commentMock).toHaveBeenCalled();
    });
    it("should not update comment if original issue was result of an error", async () => {
        const payloadHelperMock: IPayloadHelper = {
            getNewBody: jest.fn(),
            getOriginalBody: () => "## There was error processing your body\n\nThe exact error message is the following"
        };
        const commentMock = jest.fn();
        const ghHelper: IGithubIssueHelper = {
            comment: commentMock,
            updateBody: () => undefined as any
        };
        const log = jest.fn();
        const mockContext = {
            payload: {
                issue: {}
            },
            issue: (payload: { body: string }): IPayload => ({
                number: 1,
                repo: "",
                owner: "",
                body: payload.body
            }),
            log: {
                debug: log,
                info: () => undefined as any
            }
        };
        const app = new App(ghHelper, payloadHelperMock, mockContext as any);
        await app.handleEvent();
        expect(commentMock).not.toHaveBeenCalled();
        expect(payloadHelperMock.getNewBody).not.toHaveBeenCalled();
    });
});
