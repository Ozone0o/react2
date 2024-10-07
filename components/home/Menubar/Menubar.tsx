import { useAppContext } from "@/components/appcontext"
import { BiSolidUser } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { IoIosList } from "react-icons/io";

export default function Menubar() {
  return (
    <nav className="bg-gradient-to-r from-[#004C9F] to-[#001B39] p-4">
      <div className="container mx-12 flex items-center justify-between">
        <div className="flex space-x-3">
        <a href="#" className="text-white font-medium">
        <BiSolidUser size='35px' />
        </a>
        <a href="#" className="text-white text-2xl font-bold">
        SimuCustomer
        </a></div>
        <div className="flex space-x-8 items-center">
          <a href="#" className="text-white hover:text-[#004C9F]">
          <IoSettingsSharp size='35px' />
          </a>

          <a href="#" className="text-white hover:text-[#004C9F]">
          <FaMoon size='32px' />
          </a>

          <a href="#" className="text-white hover:text-[#004C9F]">
          <IoIosList size='40px'  />
          </a>
        </div>
      </div>
    </nav>
  );
}
