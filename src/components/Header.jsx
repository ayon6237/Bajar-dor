import Image from "next/image";
import Navlinks from "./Navlinks";
import CurrentDate from "./CurrentDate";
import AuthNavActions from "@/components/AuthNavActions";

const Header = () => {
  return (
    <header className="w-full bg-white">
      {/* Main Header */}
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1200px] items-center justify-between gap-3 px-3 py-3 sm:min-h-20 sm:px-5 md:px-6">
        {/* Logo and Date */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 sm:h-11 sm:w-11 sm:rounded-xl">
            <Image
              height={50}
              width={50}
              className="h-8 w-8 object-contain sm:h-10 sm:w-10"
              src="/logo-icon.png"
              alt="বাজার দর"
              priority
            />
          </div>

          {/* Website Name and Date */}
          <div className="min-w-0">
            <h2 className="whitespace-nowrap text-base font-bold leading-tight text-gray-900 sm:text-xl">
              বাজার দর
            </h2>

            <div className="mt-1 text-[10px] leading-tight text-gray-500 sm:text-xs">
              <CurrentDate />
            </div>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
          <AuthNavActions />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-full">
        <Navlinks />
      </div>
    </header>
  );
};

export default Header;