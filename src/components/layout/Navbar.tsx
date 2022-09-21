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
      flex flex-col
      gap-5
       p-10 h-full
       bg-slate-200 
      min-w-fit
       lg:left-0 lg:opacity-100 lg:block lg:static   lg:w-2/12 
        2xl:w-1/12
      `}
      >
        <div className="py-16">
          <Image src={mainLogo} alt="logo" />
        </div>
        <ul className="flex flex-col gap-10 text-stone-700">
          <li>
            <Link href={"/"}>
              <a className="flex items-end group">
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
              <a className="flex items-end group">
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
          <li>
            <Link href={"/setting"}>
              <a className="flex items-end group">
                <svg className="w-10" viewBox="0 0 24 24">
                  <path
                    className="text-slate-300 group-hover:text-lime-600 "
                    fill="currentColor"
                    d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"
                  />
                </svg>
                <span className="text-lg font-bold px-5 group-hover:text-lime-700">
                  設定
                </span>
              </a>
            </Link>
          </li>
          <li className={` ${session?.user?.role === "X" ? "" : "hiddenAdim"}`}>
            <Link href={"/auth/admin"}>
              <a className="flex items-end group">
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
              <a className="flex items-end group">
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
