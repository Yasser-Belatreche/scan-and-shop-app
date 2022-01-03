import { expect } from "chai";

import { getRandomPassword } from "./getRandomPassword";

describe("getRandomPassword function", () => {
  it("should return a random string of numbers of length bigger than 8", () => {
    expect(getRandomPassword())
      .to.be.a("string")
      .with.length.greaterThanOrEqual(8);
  });

  it("should return a different string each time", () => {
    const firstRandom = getRandomPassword();
    const secondRandom = getRandomPassword();

    expect(firstRandom).to.not.equal(secondRandom);
  });
});
