import React, { useEffect } from "react";
import Image from "next/image";
import mainLogo from "/public/mainLogo.gif";
import { navStateType } from "../../types/common";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


function Navbar({ navState, setNavState }: navStateType) {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    setNavState(false);
  }, [router.asPath]);

  return (
    <>
      <nav
        className={` 
      ${navState ? "left-0 opacity-100 block" : "-left-72 opacity-0"}
      transition-all
      fixed
      z-50
      flex flex-col lg:justify-center
      gap-5
       h-full
       bg-slate-200 
      min-w-fit
       lg:left-0 lg:opacity-100 lg:block lg:static
       lg:col-span-2  
      
       2xl:col-span-1
      `}
      >
        <div className="py-16 px-10">
          <Image src={mainLogo} alt="logo" />
        </div>
        <ul className="flex flex-col gap-14 text-stone-700 w-full
       
        ">
          <li>
            <Link href={"/"}>
              <a className="flex items-end group pl-5 lg:py-3 transition-all hover:bg-slate-100 ">
                <svg className="w-10" viewBox="0 0 24 24">
                  <path
                    className="text-slate-300 group-hover:text-lime-400 "
                    fill="currentColor"
                    d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
                  />
                </svg>
                <span className="text-lg font-bold px-5 group-hover:text-lime-700">
                  首頁
                </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/task"}>
              <a className="flex items-end group pl-5 lg:py-3 transition-all hover:bg-slate-100">
                <svg className=" w-10" viewBox="0 0 24 24">
                  <path
                    className="text-slate-300 group-hover:text-lime-500 "
                    fill="currentColor"
                    d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z"
                  />
                </svg>
                <span className="text-lg font-bold px-5 group-hover:text-lime-700">
                  報告
                </span>
              </a>
            </Link>
          </li>
          <li className={` ${session?.user?.role === "X" ? "" : "hidden"}`}>
            <Link href={"/auth/admin"}>
              <a className="flex items-end group  pl-5 lg:py-3 transition-all hover:bg-slate-100">
                <svg className=" w-10" viewBox="0 0 24 24">
                  <path
                    className="text-slate-300 group-hover:text-lime-700 "
                    fill="currentColor"
                    d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M12 3.18L5 6.3V11.22C5 15.54 8.25 20 12 21C15.75 20 19 15.54 19 11.22V6.3L12 3.18M16 14V15.5L16 15.59C15.96 15.81 15.78 15.96 15.53 16L15.43 16H8.57L8.47 16C8.22 15.96 8.04 15.81 8 15.59L8 15.5V14H16M17 8L16 13H8L7 8L7 8L9.67 10.67L12 8.34L14.33 10.67L17 8L17 8Z"
                  />
                </svg>
                <span className="text-lg font-bold px-5 group-hover:text-lime-700">
                  管理員
                </span>
              </a>
            </Link>
          </li>
          <li className="absolute bottom-10">
            <Link href={"/api/auth/signout"}>
              <a className="flex items-end group w-full pl-5 lg:py-3 transition-all hover:bg-slate-100">
                <svg className=" w-10" viewBox="0 0 24 24">
                  <path
                    className="text-slate-300 group-hover:text-lime-800 "
                    fill="currentColor"
                    d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                  />
                </svg>
                <span className="text-lg font-bold px-5 group-hover:text-lime-700">
                  登出
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      
      {navState ? (
        <div className=" h-screen w-screen fixed  z-40" onClick={() => setNavState(false)}></div>
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
