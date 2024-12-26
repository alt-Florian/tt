import { ClipLoader } from "react-spinners";

interface SpinnerProps {
  className?: string;
}

export function BigSpinner({ className }: SpinnerProps) {
  return (
    <ClipLoader
      color="#4338CA"
      size={60}
      className={className}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export function SmallSpinner({ className }: SpinnerProps) {
  return (
    <ClipLoader
      color="#4338CA"
      size={30}
      className={className}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export function ButtonSpinner({ className }: SpinnerProps) {
  return (
    <ClipLoader
      color="white"
      size={20}
      className={className}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
