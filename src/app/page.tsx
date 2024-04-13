import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import Form from "@/components/account_form";
import Table from "@/components/table";
import OwnerComp from "@/components/owner";
import { ContactHead } from "@/components/contact_head";

// This is the main component for the index page.
export default async function Home() {
  // Fetching departments and users from the database using Prisma.
  const departments = await prisma.department.findMany();
  const contacts = await prisma.contact.findMany();

  const table_data = contacts.map((contact) => ({
    name: <OwnerComp ownerId={contact.ownerId!} />,
    "Job Title": contact.jobTitle,
    department: contact.department,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="md:grid md:grid-cols-5 flex flex-col bg-gray-100 w-full p-5 md:h-[500px]">
        <section className="md:col-span-2 bg-gray-100 flex flex-col gap-20 border-r-2 pr-14 pl-5 border-gray-400">
          <header className="flex flex-col gap-3">
            <h3 className="uppercase font-bold text-2xl">Create Account</h3>
            <p>ACC-1001</p>
          </header>
          {/* Account creation form component */}
          <Form />
        </section>
        {/* Displaying fetched contacts in table */}
        <section className="md:col-span-3">
          <ContactHead />
          <div className="px-10 mt-10">
            <Table data={table_data} />
          </div>
        </section>
      </div>
    </main>
  );
}
