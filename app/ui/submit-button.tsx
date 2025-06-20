'use client';

import { useFormStatus } from "react-dom";
import { Button } from "./button";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pendingText?: string;
  disabled?: boolean;
}

export default function SubmitButton({
  children,
  className,
  pendingText,
  disabled,
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <Button
      {...rest}
      type="submit"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={className}
    >
      {pending ? pendingText || "Submitting..." : children}
    </Button>
  );
}
