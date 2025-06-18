'use client';

import { useFormStatus } from "react-dom";
import { Button } from "./button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pendingText?: string;
}

export default function SubmitButton({ children, className, pendingText, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? pendingText || "Submitting..." : children}
    </Button>
  );
}
