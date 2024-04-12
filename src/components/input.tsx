import React, { ChangeEventHandler, Fragment, useState } from "react";
import { ChangeHandler, Control, Controller } from "react-hook-form";
import { FiEye, FiEyeOff, FiChevronDown, FiCheck } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";

interface InputFieldProps {
  defaultValue?: string;
  placeholder: string;
  type?: string | "text";
  name: string;
  onChange?: ChangeHandler | ChangeEventHandler;
  control?: Control<any>;
  className?: string;
  icon?: JSX.Element;
  required?: boolean;
  label: string;
}

type Ref = HTMLInputElement;

export const TextField = React.forwardRef<Ref, InputFieldProps>(
  (props, ref) => {
    return (
      <div
        role="text-input"
        className="flex gap-10 justify-between items-center"
      >
        <div>
          {props.icon && props.icon} <span>{props.label}</span>
        </div>
        <input
          ref={ref}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          name={props.name}
          required={props.required}
          className="w-4/6 bg-transparent outline-none border border-gray-300 bg-gray-50 p-3 rounded-md"
        />
      </div>
    );
  }
);
