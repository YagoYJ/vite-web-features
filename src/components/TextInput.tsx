import { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ type = "text", ...rest }: TextInputProps) {
  return (
    <input type={type} className="w-full rounded-md px-3 h-10" {...rest} />
  );
}
