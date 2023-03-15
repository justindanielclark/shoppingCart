import capitalizeAllWords from "../capitalizeAllWords";

describe("capitalizeAllWords", () => {
  it("Turns 'donald trump' into 'Donald Trump'", () => {
    expect(capitalizeAllWords("donald trump")).toBe("Donald Trump");
  });
  it("Turns 'along came a spider!' into 'Along Came A Spider!'", () => {
    expect(capitalizeAllWords("along came a spider!")).toBe(
      "Along Came A Spider!"
    );
  });
  it("Turns 'hello    world' into 'Hello World'", () => {
    expect(capitalizeAllWords("hello    world")).toBe("Hello World");
  });
});
