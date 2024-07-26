import { expect } from "chai";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

describe("Parking Lot System", function () {
  it("should create parking lot and park cars correctly", function () {
    const inputFilePath = path.resolve(
      __dirname,
      "../functional_spec/fixtures/file_input.txt"
    );
    const result = execSync(`node dist/index.js ${inputFilePath}`).toString();
    const expectedOutput = fs.readFileSync(
      path.resolve(__dirname, "../functional_spec/expected_output.txt"),
      "utf-8"
    );
    expect(result).to.equal(expectedOutput);
  });
});
