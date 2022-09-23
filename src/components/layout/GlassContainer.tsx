import React from "react";
import { glassContainerType } from "../../types/common";
import TopBar from "./TopBar";

function GlassContainer({ children }: glassContainerType) {
  return (
    <>
      <div
        className=" bg-stone-50 h-full
    lg:col-span-10 2xl:col-span-11"
      >
        <TopBar />
        <div
          className="flex align-middle flex-col p-2  md:p-4
     "
        >
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export default GlassContainer;
