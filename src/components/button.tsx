import React from "react";
import { clsx } from "clsx";
import { useFormStatus } from "react-dom";

type ButtonPropsType = {
  name: string;
  onPress?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: JSX.Element;
  className?: string;
};

export const AppButton = ({
  name,
  onPress,
  icon,
  className,
}: ButtonPropsType) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx(
        `py-2 px-5 cursor-pointer rounded-md text-white disabled:bg-opacity-50`,
        className
      )}
      onClick={onPress}
    >
      {pending ? "creating account..." : name}
    </button>
  );
};
