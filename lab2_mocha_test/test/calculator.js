import { expect } from "chai";
import * as calculator from "../app/calculator.js"; 

describe("Calculator Tests", () => {
    
    it("add(5, 2) should return 7", () => {
        expect(calculator.add(5, 2)).to.equal(7);
    });

    it("add(5, 2) should return 8 (FAIL)", () => {
        expect(calculator.add(5, 2)).to.equal(8);
    });

    it("sub(5, 2) should return 3", () => {
        expect(calculator.sub(5, 2)).to.equal(3);
    });

    it("sub(5, 2) should return 5 (FAIL)", () => {
        expect(calculator.sub(5, 2)).to.equal(5);
    });

    it("mul(5, 2) should return 10", () => {
        expect(calculator.mul(5, 2)).to.equal(10);
    });

    it("mul(5, 2) should return 12 (FAIL)", () => {
        expect(calculator.mul(5, 2)).to.equal(12);
    });

    it("div(10, 2) should return 5", () => {
        expect(calculator.div(10, 2)).to.equal(5);
    });

    it("div(10, 2) should return 2 (FAIL)", () => {
        expect(calculator.div(10, 2)).to.equal(2);
    });
});
