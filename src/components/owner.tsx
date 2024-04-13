import { getUserById } from "@/actions/actions";
import Image from "next/image";

export default async function OwnerComp({ ownerId }: { ownerId: number }) {
  const result = await getUserById(ownerId);
  return (
    <div className="flex gap-2 items-center">
      <Image
        src=""
        alt=""
        className="bg-red-200 h-10 w-10 flex justify-center items-center rounded-full"
      />
      <span>{result?.name}</span>
    </div>
  );
}
