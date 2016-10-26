
export class MyClass {

    public stringProp: string = "some string";
    public numberProp: number = 42;

    public getSomeString() {
        return `I'm ${this.stringProp} and i will be returned!`;
    }
}
