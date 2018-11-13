import React from "react";

import { LoaderFull } from "../../ui-kit/molecules/loader-fullscreen/LoaderFullScreen";
import * as utils from "../../services/helper/utils";
import * as sinon from "sinon";
import { Error } from "@nex/ui-kit-library";
import { withExternalScript } from "./WithExternalScript";
import * as dictionary from "./AlreadyAddedExternalScripts";

describe("withExternalScript high order component", () => {
  const RandomComponent = () => <div>Hola</div>;
  const WithExternalRoute = withExternalScript(RandomComponent, "foo");
  let sandbox;
  let addBodyScriptStub;
  let markScriptAsAddedStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    addBodyScriptStub = sandbox.stub(utils, "addBodyScript").resolves(1);
    markScriptAsAddedStub = sandbox.stub(dictionary, "markScriptAsAdded");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should render loading as initial state", () => {
    sandbox.stub(dictionary, "isScriptAlreadyAdded").returns(false);
    const component = shallow(<WithExternalRoute />);
    expect(component.contains(<LoaderFull />)).toBe(true);
  });

  it("should render error on error", () => {
    sandbox.stub(dictionary, "isScriptAlreadyAdded").returns(false);
    const component = shallow(<WithExternalRoute />);
    component.setState({ loading: false, error: true });
    expect(component.containsMatchingElement(<Error />)).toBe(true);
  });

  it("should check is script is already added", () => {
    const stub = sandbox.stub(dictionary, "isScriptAlreadyAdded").returns(true);
    shallow(<WithExternalRoute />);
    expect(stub.getCall(0).args[0]).toBe("foo");
  });

  it("should render wrapped component when script is loaded", () => {
    sandbox.stub(dictionary, "isScriptAlreadyAdded").returns(true);
    const component = shallow(<WithExternalRoute />);
    expect(component.containsMatchingElement(<RandomComponent />)).toBe(true);
  });

  it("should add script element to body on component mount", () => {
    sandbox.stub(dictionary, "isScriptAlreadyAdded").returns(false);
    shallow(<WithExternalRoute />);
    expect(addBodyScriptStub.getCall(0).args[0]).toBe("foo");
  });

  it("should mark script as added", () => {
    sandbox.stub(dictionary, "isScriptAlreadyAdded").returns({ bar: true });
    const wrapper = shallow(<WithExternalRoute />);
    wrapper.instance().onAddedBodyScript();
    expect(markScriptAsAddedStub.calledWithExactly("foo")).toBe(true);
  });

  it("should no add script to body when the script is already added", () => {
    sandbox.stub(dictionary, "isScriptAlreadyAdded").returns(true);
    shallow(<WithExternalRoute />);
    expect(addBodyScriptStub.callCount).toBe(0);
  });
});
