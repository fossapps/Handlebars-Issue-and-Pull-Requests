import {HandlebarCompiler} from "./HandlebarCompiler";

describe("HandlebarCompiler", () => {
    it("should be able to render data", () => {
        const compiler = new HandlebarCompiler<{id: number}>("data: {{id}}");
        expect(compiler.render({id: 5})).toEqual("data: 5");
    });
});
