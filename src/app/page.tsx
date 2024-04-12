import { AppButton } from "@/components/button";
import { TextField } from "@/components/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import Form from "@/components/account_form";

// This is the main component for the index page.
export default async function Home() {
  // Fetching departments and users from the database using Prisma.
  const departments = await prisma.department.findMany();
  const users = await prisma.user.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-5 bg-gray-100 w-full p-5 h-[500px]">
        <section className="col-span-2 bg-gray-100 flex flex-col gap-20 border-r-2 pr-14 pl-5 border-gray-400">
          <header className="flex flex-col gap-3">
            <h3 className="uppercase font-bold text-2xl">Create Account</h3>
            <p>ACC-1001</p>
          </header>
          {/* Account creation form component */}
          <Form />
        </section>
        {/* Displaying fetched contacts as JSON */}
        <section className="px-5"> {JSON.stringify(users)}</section>
      </div>
    </main>
  );
}
