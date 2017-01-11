
import {MyClass} from "./MyClass";

describe("MyClass", () => {
    it("is defined", () => {
        expect(MyClass).toBeDefined();
    });

    it("has a stringProp property", () => {
        let mc = new MyClass();
        expect(mc.stringProp).toBeDefined();
    });

    it("has a numberProp property", () => {
        let mc = new MyClass();
        expect(mc.numberProp).toBeDefined();
    });

    describe("getSomeString()", () => {
        it ("is defined", () => {
            let mc = new MyClass();
            expect(mc.getSomeString).toBeDefined();
        });

        it("returns a string", () => {
            let mc = new MyClass();
            let res = mc.getSomeString();
            expect(typeof res === "string").toBeTruthy();
        });
    });
});
