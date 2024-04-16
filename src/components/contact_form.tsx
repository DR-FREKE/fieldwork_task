"use client";

import { useEffect, useRef, useState } from "react";
import { AppButton } from "./button";
import { SelectField, TextField } from "./input";
import { getDepartments } from "@/actions/actions";

type Department = {
  id: number;
  name: string;
  description: string | null;
};

export default function ContactForm({ onClose }: { onClose: Function }) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const form_ref = useRef<HTMLFormElement>(null); // Reference to the form element

  useEffect(() => {
    const fetchDepartments = async () => {
      const dep = await getDepartments();
      setDepartments([...departments, ...(dep || [])]);
    };
    fetchDepartments();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    form_ref.current?.reset(); // Reset the form fields after submission
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form_ref.current?.reset();
    onClose();
  };

  return (
    <form
      ref={form_ref}
      action={handleFormSubmit}
      className="flex flex-col gap-20 h-full justify-between"
    >
      <div className="flex flex-col gap-3">
        <TextField
          placeholder="Enter Job Title"
          name="jobTitle"
          label="Job Title"
          required
        />
        <SelectField
          name="department"
          placeholder="Select Department"
          label="Department"
          items={departments}
          view_by="name"
          set_value_as="id"
        />
        {JSON.stringify(departments)}
      </div>
      <div className="flex justify-end gap-5">
        <AppButton
          name="Cancel"
          className="bg-red-600"
          onPress={handleCancel} // Handle the cancel action
        />
        <AppButton name="Save" className="bg-blue-500 " />
      </div>
    </form>
  );
}
