/**
 * we use this action to communicate directly with the prisma DB
 * for creating an account
 *
 */
"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export const addUsers = async (formData: FormData) => {
  // Extracting user details from the form data
  const account_name = formData.get("account_name");
  const email = formData.get("email");
  const phone = formData.get("phone");

  try {
    // Creating a new user record in the database
    await prisma.user.create({
      data: {
        name: account_name as string,
        phone: phone as string,
        email: email as string,
        address: "Block 32 flat 4, Odonla",
      },
    });
  } catch (error) {
    // Returning error object in case of any failure during user creation
    return { error };
  }

  // Revalidating the root path to update the cache after adding a new user
  revalidatePath("/"); // we'll use this whenever we create a contact as well
};
