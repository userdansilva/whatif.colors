import { forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";

interface ColorFieldProps {
  onChange: ChangeHandler
  onBlur: ChangeHandler
  name: string
  label: string
}

export const ColorField = forwardRef<HTMLInputElement, ColorFieldProps>((props, ref) => {
  const { label, ...register } = props;

  return (
    <label htmlFor={register.name} className="flex flex-col gap-2 items-center relative">
      {label}
      <input
        type="color"
        id={register.name}
        className="inputColor"
        {...{ ...register, ref }}
      />
    </label>
  );
});
