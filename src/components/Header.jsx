
import Image from "next/image";
import Navlinks from "./Navlinks";
import Link from "next/link";
import CurrentDate from "./CurrentDate";
import AuthNavActions from "@/components/AuthNavActions";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto flex min-h-20 max-w-[1200px] items-center justify-between px-4">
        {/* Logo and Date */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
            <Image
              height={50}
              width={50}
              className="h-10 w-10 object-contain"
              src="/logo-icon.png"
              alt="বাজার দর"
              priority
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              বাজার দর
            </h2>

            <CurrentDate />
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-2">
          <AuthNavActions />
        </div>
      </div>

      <Navlinks />
    </header>
  );
};

export default Header;
