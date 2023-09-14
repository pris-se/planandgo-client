import React, { Component } from "react";
import { ErrorPage } from "../pages/ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log("ErrorBoundary", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      const errorInfo =
        this.state.errorInfo || "An error occurred. Please try again later.";
      return <ErrorPage message={errorInfo} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
