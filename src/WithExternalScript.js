import React from "react";
import { isScriptAlreadyAdded, markScriptAsAdded } from "./AlreadyAddedExternalScripts";
import {addBodyScript} from "./AddBodyScript";

export const withExternalScript = (WrappedComponent, externalScriptSrc, LoadingComponent = null, ErrorComponent = null) => {
  return class withExternalScriptHOC extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        loading: !isScriptAlreadyAdded(externalScriptSrc)
      };
    }

    componentDidMount() {
      if (isScriptAlreadyAdded(externalScriptSrc)) {
        return;
      }

      addBodyScript(externalScriptSrc)
        .then(() => this.onAddedBodyScript())
        .catch(() => this.setState({ loading: false, error: true }));
    }

    onAddedBodyScript() {
      this.setState({ loading: false });
      markScriptAsAdded(externalScriptSrc);
    }

    render() {
      if (this.state.loading) {
        return LoadingComponent ? <LoadingComponent {...this.props} />:null;
      }

      if (this.state.error) {
        return ErrorComponent ? <ErrorComponent {...this.props} />:null;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};
