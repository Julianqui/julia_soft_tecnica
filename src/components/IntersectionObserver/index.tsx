import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

interface IntersectionObserverProps {
  render: (isIntersecting: boolean) => React.ReactNode;
  threshold?: number;
}

export const IntersectionObserver: FC<IntersectionObserverProps> = ({
  render,
  threshold = 0.1,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return <div ref={ref}>{render(isIntersecting)}</div>;
};
