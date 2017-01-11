
import {MyClass} from "./MyClass";

describe("MyClass", () => {
    it("is defined", () => {
        expect(MyClass).toBeDefined();
    });

    it("has a stringProp property", () => {
        const mc = new MyClass();
        expect(mc.stringProp).toBeDefined();
    });

    it("has a numberProp property", () => {
        const mc = new MyClass();
        expect(mc.numberProp).toBeDefined();
    });

    describe("getSomeString()", () => {
        it ("is defined", () => {
            const mc = new MyClass();
            expect(mc.getSomeString).toBeDefined();
        });

        it("returns a string", () => {
            const mc = new MyClass();
            const res = mc.getSomeString();
            expect(typeof res === "string").toBeTruthy();
        });
    });
});
