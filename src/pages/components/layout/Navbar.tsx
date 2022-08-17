import React, { useState } from "react";
import Image from "next/image";
import mainLogo from "/public/mainLogo.gif";
import { navStateType, pageIndexNavStateType } from "../../../types/common";
import Link from "next/link";
function Navbar({
  navState,
  setNavState,
  pageIndex,
  setPageIndex,
}: pageIndexNavStateType) {


const pageHandler =(n:number)=>{
    setNavState(!navState)
    setPageIndex(n)
}

  return (
    <>
      <nav className={`${navState ? "showNav" : "hideNav"}`}>
        <div className="logo">
          <Image src={mainLogo} />
        </div>
        <ul>
          <li className={`${pageIndex===0?"active":""}`}>
            <Link href={"/"}>
              <a onClick={()=>pageHandler(0)}>
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
                  />
                </svg>
                <span>首頁</span>
              </a>
            </Link>
          </li>
          <li className={`${pageIndex===1?"active":""}`}>
            <Link href={"/auth/admin"}>
            <a onClick={()=>pageHandler(1)}>
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z"
                  />
                </svg>
                <span>訂單</span>
              </a>
            </Link>
          </li>
          <li className={`${pageIndex===2?"active":""}`}>
            <Link href={"/auth/admin"}>
            <a onClick={()=>pageHandler(2)}>
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z"
                  />
                </svg>
                <span>顧客</span>
              </a>
            </Link>
          </li>
          <li className={`${pageIndex===3?"active":""}`}>
            <Link href={"/auth/admin"}>
            <a onClick={()=>pageHandler(3)}>
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z"
                  />
                </svg>
                <span>分析表</span>
              </a>
            </Link>
          </li>
          <li className={`${pageIndex===4?"active":""}`}>
          <Link href={"/auth/admin"}>
            <a onClick={()=>pageHandler(4)}>
                <svg className="icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M12 3.18L5 6.3V11.22C5 15.54 8.25 20 12 21C15.75 20 19 15.54 19 11.22V6.3L12 3.18M16 14V15.5L16 15.59C15.96 15.81 15.78 15.96 15.53 16L15.43 16H8.57L8.47 16C8.22 15.96 8.04 15.81 8 15.59L8 15.5V14H16M17 8L16 13H8L7 8L7 8L9.67 10.67L12 8.34L14.33 10.67L17 8L17 8Z" />
                </svg>
                <span>管理員</span>
              </a>
            </Link>
          </li>
          <li className={`${pageIndex===5?"active":""}`}>
            <Link href={"/api/auth/signout"}>
            <a onClick={()=>pageHandler(5)}>
                <svg className="icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                  />
                </svg>
                <span>登出</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      {navState ? (
        <div className="invisibleDiv" onClick={() => setNavState(false)}></div>
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
