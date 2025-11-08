import React from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Input } from "~/components/ui/input";

type TextInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  required?: boolean;
  slot?: React.ReactElement;
} & Omit<React.ComponentProps<"input">, "slot">;

export const TextInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  required,
  slot,
  ...inputProps
}: TextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { invalid, error } }) => {
        return (
          <div className="flex flex-col space-y-1">
            {label && (
              <label htmlFor={name} className="block text-purple-100 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            )}

            <div className="relative">
              <Input {...inputProps} {...field} />
              {slot}
            </div>

            {invalid && error && (
              <p className="font-semibold text-sm text-red-500">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
