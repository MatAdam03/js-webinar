const calc = require('../calc');
const expect = require('chai').expect;

describe.only('calc', () => {
    describe("basic constructor tests", () => {
        it("should be able to handle positive input numbers", () => {
            const calculator = calc(3);
            const input = calculator.v;
            expect(input).to.equal(3);
        });
        it("should be able to handle negative input numbers", () => {
            const calculator = calc(-30);
            const input = calculator.v;
            expect(input).to.equal(-30);
        });
        it.skip("should throw error on NaN input", () => {
            const calculator = calc("dgf");
            const input = () => calculator.v;
            expect(input).to.throw("Input must be a number");
        });
    });

    describe("add", () => {
        it("should exist", () => {
            const calculator = calc(10);
            expect(calculator.add).not.to.be.undefined;
        });
        it("should be able to add a postive number to a positive number", () => {
            const calculator = calc(3);
            const result = calculator.add(5).v;
            expect(result).to.equal(8);
        });
        it("should be able to add negative number with negative number", () => {
            const calculator = calc(-5);
            const result = calculator.add(-10).v;
            expect(result).to.equal(-15);
        });
        it("should be able to add negative number with positve number", () => {
            const calculator = calc(-3);
            const result = calculator.add(10).v;
            expect(result).to.equal(7);
        });
        it("should be able to add positive number with negative number", () => {
            const calculator = calc(3);
            const result = calculator.add(-10).v;
            expect(result).to.equal(-7);
        });
        it.skip("should throw error on adding a NaN input", () => {
            const calculator = calc(5);
            const result = () => calculator.add("sdf").v;
            expect(result).to.throw("Input must be a number");
        });
    });

    describe("minus", () => {
        it("should exist", () => {
            const calculator = calc(10);
            expect(calculator.minus).not.to.be.undefined;
        });
        it("should be able to substract a positive number from a postive number", () => {
            const calculator = calc(3);
            const result = calculator.minus(2).v;
            expect(result).to.equal(1);
        });
        it("should be able to substract negative number from negative number", () => {
            const calculator = calc(-5);
            const result = calculator.minus(-8).v;
            expect(result).to.equal(3);
        })
        it("should be able to substract negative number from positve number", () => {
            const calculator = calc(5);
            const result = calculator.minus(-8).v;
            expect(result).to.equal(13);
        });
        it("should be able to substract positive number from negative number", () => {
            const calculator = calc(-5);
            const result = calculator.minus(8).v;
            expect(result).to.equal(-13);
        });
        it.skip("should throw error on substract a NaN input", () => {
            const calculator = calc(-5);
            const result = () => calculator.minus("sdf").v;
            expect(result).to.throw("Input must be a number");
        });
    });

    describe("sqrt", () => {
        it("should exist", () => {
            const calculator = calc(4);
            expect(calculator.sqrt).not.to.be.undefined;
        });
        it("should be able to calculate square root", () => {
            const calculator = calc(4);
            const result = calculator.sqrt().v;
            expect(result).to.equal(2);
        });
        it("should throw error on negative numbers", () => {
            const calculator = calc(-3);
            const result = () => calculator.sqrt();
            expect(result).to.throw("Square root of negative value cannot be determined!");
        });
    });

    describe("multiplication", () => {
        it("should exist", () => {
            const calculator = calc(4);
            expect(calculator.times).not.to.be.undefined;
        });
        it("should be able to multiplicate positive number with positive number", () => {
            const calculator = calc(6);
            const result = calculator.times(6).v;
            expect(result).to.equal(36);
        });
        it("should be able to multiplicate negative number with negative number", () => {
            const calculator = calc(-3);
            const result = calculator.times(-10).v;
            expect(result).to.equal(30);
        });
        it("should be able to multiplicate negative with positive numbers", () => {
            const calculator = calc(-5);
            const result = calculator.times(10).v;
            expect(result).to.equal(-50);
        });
        it("should be able to multiplicate positive with negative numbers", () => {
            const calculator = calc(3);
            const result = calculator.times(-10).v;
            expect(result).to.equal(-30);
        });
        it.skip("should throw error on multiplicating with a NaN input", () => {
            const calculator = calc(-5)
            const result = () => calculator.times("sdf").v;
            expect(result).to.throw("Input must be a number");
        });
    });

    describe("divide", () => {
        it("should exist", () => {
            const calculator = calc(10);
            expect(calculator.divide).not.to.be.undefined;
        });
        it("should be able to divide positive number with positive number", () => {
            const calculator = calc(10);
            const result = calculator.divide(2).v;
            expect(result).to.equal(5);
        });
        it("should be able to divide negative number with negative number", () => {
            const calculator = calc(-30);
            const result = calculator.divide(-3).v;
            expect(result).to.equal(10);
        });
        it("should be able to divide negative number with positive number", () => {
            const calculator = calc(-10);
            const result = calculator.divide(2).v;
            expect(result).to.equal(-5);
        });
        it("should be able to divide positive number with negative number", () => {
            const calculator = calc(50);
            const result = calculator.divide(-5).v;
            expect(result).to.equal(-10);
        });
        it("shouldn't be able to divide by 0", () => {
            const calculator = calc(10);
            const result = () => calculator.divide(0).v;
            expect(result).to.throw("Division by 0 is not possible!");
        });
        it("should be able to make modulo calculation", () => {
            const calculator = calc(10);
            const result = calculator.modulo(5).v;
            expect(result).to.equal(0)
        });
        it.skip("should throw error on dividing with a NaN input", () => {
            const calculator = calc(10)           
            const result = () => calculator.divide("sdf").v;
            expect(result).to.throw("Input must be a number");
        });
    });

    describe("chaining", () => {
        it("should be able to chain commands", () => {
            const calculator = calc(3);
            const result = calculator.add(4).minus(3).times(6).v;
            expect(result).to.equal(24);
        });
        it("should be able to chain commands", () => {
            const calculator = calc(3);
            const result = calculator.add(5).minus(2).times(6).sqrt().modulo(4).v;
            expect(result).to.equal(2);
        });
    });
});