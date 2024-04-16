"use client";

import { useRef } from "react";
import { AppButton } from "./button";
import { TextField } from "./input";
import { addUsers } from "@/actions/actions";
import { Phone, TextFields } from "@mui/icons-material";

export default function AccountForm() {
  const form_ref = useRef<HTMLFormElement>(null); // Reference to the form element

  const handleFormSubmit = async (formData: FormData) => {
    form_ref.current?.reset(); // Reset the form fields after submission

    const response = await addUsers(formData); // Call the addUsers action with the form data
    const { error } = response as { error?: string }; // Destructure the error from the response, if any

    if (error) {
      alert(error); // Display the error message to the user...we could use one of those toast package
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form_ref.current?.reset();
  };

  return (
    <form
      ref={form_ref}
      action={handleFormSubmit}
      className="flex flex-col gap-20 h-full justify-between"
    >
      <div className="flex flex-col gap-3">
        <TextField
          placeholder="Account Name"
          name="account_name"
          label="Name"
          icon={<TextFields />}
          required
        />
        <TextField
          type="text"
          name="phone"
          placeholder="Phone Number"
          label="Phone"
          required
        />
        <TextField
          type="email"
          name="email"
          placeholder="Account Email"
          label="Email"
          required
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
