import { FormControl, MenuItem, Select } from "@mui/material";
import React, {
  ChangeEventHandler,
  Fragment,
  ReactNode,
  useState,
} from "react";
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

type SelectFieldProps<T> = {
  items: T[];
  view_by?: string;
  set_value_as?: string;
} & InputFieldProps;

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

export const SelectField = React.forwardRef<Ref, SelectFieldProps<any>>(
  (props, ref) => {
    const [selected, setSelected] = useState<ReactNode>();

    const handleChange = (event: { target: { value: ReactNode } }) => {
      setSelected(event.target.value);
    };
    return (
      <div className="flex gap-10 justify-between items-center">
        <div>
          {props.icon && props.icon} <span>{props.label}</span>
        </div>
        <FormControl className="w-4/6 outline-none rounded-md">
          <Select
            value={selected}
            displayEmpty
            onChange={handleChange}
            renderValue={(select) => {
              if (!select) {
                return <span className="opacity-45">{props.placeholder}</span>;
              }

              return [select].join(", ");
            }}
          >
            <MenuItem value="">
              <span>None</span>
            </MenuItem>
            {props.items.map((content, index) => (
              <MenuItem value={content} key={index}>
                {content[props.view_by as string] || content}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
);
