import { isScriptAlreadyAdded, markScriptAsAdded } from "./AlreadyAddedExternalScripts";

describe("AlreadyAddedExternalScript", () => {
  it("should return script not added by default", () => {
    expect(isScriptAlreadyAdded("foo-foo")).toBe(false);
  });

  it("should return script added after mark script as added", () => {
    markScriptAsAdded("foo-bar");
    expect(isScriptAlreadyAdded("foo-bar")).toBe(true);
  });
});
