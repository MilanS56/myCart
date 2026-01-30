"use client";

import React from "react";

export default function withErrorBoundary<Props>(
  WrappedComponent:React.ComponentType<Props>
)
// type Props = {
//   children: React.ReactNode;
// };

// type State = {
//   hasError: boolean;
// };
{return class ErrorBoundary extends React.Component<Props,{hasError:boolean}> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("Error caught:", error, info);
    return;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong 😢
          </h1>
          <p className="mt-2">Please refresh the page.</p>
          <p></p>
        </div>
      );
    }

    return <WrappedComponent{...this.props}/>;
  
}
}
}