'use client';

import clsx from "clsx";
import { Button } from "./button";
import LoadingSpinner from "./loading-spinner";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pending?: boolean;
  pendingText?: string;
  disabled?: boolean;
}

export default function SubmitButton({
  children,
  className,
  pending,
  pendingText,
  disabled,
  ...rest
}: SubmitButtonProps) {
  const isDisabled = pending || disabled;

  return (
    <Button
      {...rest}
      type="submit"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={`relative ${className ?? ''}`}
    >
      {pending && pendingText && pendingText}
      {pending && !pendingText && (
        <span className="absolute inset-0 flex items-center justify-center z-10 bg-white/60 rounded-lg">
          <LoadingSpinner />
        </span>
      )}
      <span className={clsx(
        pending && !pendingText ? "opacity-50" : "",
        'contents'
      )}>
        {children}
      </span>
    </Button>
  );
}
