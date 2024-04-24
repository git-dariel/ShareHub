import React from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";

function Notification({ hasNotification }) {
  return (
    <div className="relative">
      <div className="flex flex-col h-10 w-10 items-center justify-center text-gray-500 hover:text-blue-500 transition-all duration-150">
        <HiOutlineBellAlert size={23} />
        {!hasNotification && (
          <div className="absolute top-[4px] right-[5px] bg-red-500 rounded-full h-[7px] w-[7px]"></div>
        )}
      </div>
    </div>
  );
}

export default Notification;