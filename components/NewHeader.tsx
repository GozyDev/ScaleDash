import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Settings } from "lucide-react";

const NewHeader = () => {
  return (
    <header className="flex justify-between items-center bg-neutral-900 text-neutral-100 px-6 py-3 border-b border-gray-800/70 backdrop-blur-sm fixed top-0 left-0 w-full">
      {/* Left Section - Logo and Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="">
            <Image
              src="/supabase-logo.svg"
              alt="Supabase Logo"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
          <span className="font-light text-gray-300/50 text-lg">/</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-medium text-sm text-gray-100">New Organizations</p>
          {/* <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-300" /> */}
        </div>
      </div>

      {/* Right Section - User Menu */}
      <div className="flex items-center gap-4">
        {/* Navigation Icons */}
        <div className="flex items-center gap-3 mr-2">
          <button className="p-2 text-sm font-light border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors group">
            Feedback
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors group">
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
          </button>
        </div>

        {/* User Avatar with Dropdown */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-700/50">
          <div className="relative group cursor-pointer">
            <Avatar className="w-9 h-9 border-2 border-transparent group-hover:border-blue-500 transition-all duration-200">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                JD
              </AvatarFallback>
            </Avatar>

            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
