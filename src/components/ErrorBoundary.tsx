import { Component, type ReactNode } from 'react';

/* Renders `fallback` if a child throws (e.g. WebGL is unavailable) so the page never goes blank. */
interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
