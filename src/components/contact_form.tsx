"use client";

import { useEffect, useRef, useState } from "react";
import { AppButton } from "./button";
import { SelectField, TextField } from "./input";
import { getDepartments, getUsers, addContacts } from "@/actions/actions";
import { on } from "events";

type Department = {
  id: number;
  name: string;
  description: string | null;
};

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function ContactForm({ onClose }: { onClose: Function }) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const form_ref = useRef<HTMLFormElement>(null); // Reference to the form element

  useEffect(() => {
    const fetchDepartments = async () => {
      const dep = await getDepartments();
      setDepartments([...departments, ...(dep || [])]);
    };

    const fetchUsers = async () => {
      const user = await getUsers();
      setUsers([...users, ...(user || [])]);
    };

    fetchDepartments();
    fetchUsers();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    form_ref.current?.reset(); // Reset the form fields after submission

    const response = await addContacts(formData); // Call the addUsers action with the form data
    // const { error } = response as { error?: string }; // Destructure the error from the response, if any

    if (response?.error) {
      alert(response.error); // Display the error message to the user...we could use one of those toast package
    }
    onClose();
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
          items={departments.map((content) => content.name)}
        />
        <SelectField
          name="owner"
          placeholder="Select User"
          label="User"
          items={users}
          view_by="name"
          set_value_as="id"
        />
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
