import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { createClient } from "@/lib/superbase/superbase-server";

const User = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const { user } = data;
  return (
    <div className="flex items-center gap-3 pl-3 border-l border-gray-700/50">
      <div className="relative group cursor-pointer">
        <Avatar className="w-9 h-9 border-2 border-transparent group-hover:border-blue-500 transition-all duration-200">
          <AvatarImage src={user?.user_metadata.avatar_url} alt="User Avatar" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
            {user?.user_metadata.full_name.slice(0, 2) ??
              user?.user_metadata.email.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {/* Online Status Indicator */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
      </div>
    </div>
  );
};

export default User;
