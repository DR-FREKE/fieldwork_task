"use client";

import { Home as MuiHome } from "@mui/icons-material";
import { FiPlus } from "react-icons/fi";

export const ContactHead = () => {
  const openModal = () => {
    alert("open modal");
  };

  return (
    <header className="h-20 flex items-end justify-between">
      <div className="py-3 border-b-2 border-gray-400 px-10 md:w-5/6">
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <MuiHome /> Contacts
          </div>
          <hr className="border-l-2 border-gray-400 h-6" />
          <div>Locations</div>
        </div>
      </div>
      <div className="py-3">
        <FiPlus
          size={20}
          className="text-gray-600 cursor-pointer"
          onClick={openModal}
        />
      </div>
    </header>
  );
};
