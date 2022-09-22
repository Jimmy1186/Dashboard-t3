import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

function TopBar() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
       <LinearProgress color="success" />
      </>
    );
  }
  return (
    <div
      className="border-b-1  h-16 shadow-lg flex justify-start lg:justify-end items-center px-5
    lg:col-span-10 2xl:col-span-11"
    >
      <Link href={"/setting"}>
        <a>
          <div className="w-10 h-10 rounded-full bg-amber-300 text-stone-600 flex justify-center align-middle items-center font-extrabold text-xl">
            {session?session?.user?.name?.charAt(0):<Skeleton variant="circular" width={40} height={40} />}
          </div>
        </a>
      </Link>
    </div>
  );
}

export default TopBar;
