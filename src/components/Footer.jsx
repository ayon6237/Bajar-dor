import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-3 py-5 text-center sm:gap-4 sm:px-5 sm:py-6 md:flex-row md:items-center md:gap-6 md:px-6 md:text-left">
        <p className="max-w-full text-sm font-medium leading-6 text-gray-700 sm:text-base">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="max-w-full text-xs leading-5 text-gray-500 sm:text-sm md:max-w-[480px] md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
