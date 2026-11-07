import { Component } from 'react';

/* Renders `fallback` if a child throws (e.g. WebGL is unavailable) so the page never goes blank. */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
