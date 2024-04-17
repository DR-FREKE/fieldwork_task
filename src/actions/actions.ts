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
};

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({ where: { id } });

    return user;
  } catch (error) {
    console.error("Failed to retrieve user:", error);
    return null;
  }
};

export const getDepartments = async () => {
  try {
    const departments = await prisma.department.findMany();
    return departments;
  } catch (error) {
    console.error("Failed to retrieve departments:", error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Failed to retrieve users:", error);
    return null;
  }
};

export const addContacts = async (formData: FormData) => {
  const jobTitle = formData.get("jobTitle");
  const department = formData.get("department");
  const ownerId = formData.get("owner");

  try {
    // Creating a new contact record in the database
    await prisma.contact.create({
      data: {
        jobTitle: jobTitle as string,
        department: department as string,
        owner: {
          connect: { id: parseInt(ownerId as string, 10) },
        },
      },
    });
  } catch (error) {
    // Returning error object in case of any failure during user creation
    return { error };
  }

  // Revalidating the root path to update the cache after adding a new user
  revalidatePath("/"); // we'll use this whenever we create a contact as well
};
