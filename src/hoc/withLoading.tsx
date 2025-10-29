import type { ComponentType } from "react";
import { useState } from "react";

export interface WithLoadingProps {
  isLoading: boolean;
}

export function withLoading<T extends object>(
  WrappedComponent: ComponentType<T & WithLoadingProps>
) {
  return function WithLoadingComponent(props: T) {
    const [isLoading, setIsLoading] = useState(false);

    // Simulate async operation
    const handleAsyncOperation = async (operation: () => Promise<void>) => {
      setIsLoading(true);
      try {
        await operation();
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <WrappedComponent
        {...props}
        isLoading={isLoading}
        onAsyncOperation={handleAsyncOperation}
      />
    );
  };
}
