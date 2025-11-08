import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { TextInput } from "./TextInput";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  className?: string;
  placeholder?: string;
};

export const PasswordInput = <T extends FieldValues>({
  className,
  label,
  name,
  control,
  rules,
  placeholder,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      name={name}
      control={control}
      rules={rules}
      label={label}
      type={showPassword ? "text" : "password"}
      required
      className={`pr-10 ${className || ""}`}
      placeholder={placeholder}
      slot={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      }
    />
  );
};
