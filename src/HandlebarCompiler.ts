import {compile} from "handlebars";
import {ITemplateVars} from "./PayloadHelper";

export interface IHandlebarCompiler<T> {
    render(templateVariables: T): string;
}

export class HandlebarCompiler<T = ITemplateVars> implements IHandlebarCompiler<T> {
    private readonly template: HandlebarsTemplateDelegate<T>;
    constructor(text: string) {
        this.template = compile(text);
    }

    public render(templateVariables: T): string {
        return this.template(templateVariables);
    }
}
