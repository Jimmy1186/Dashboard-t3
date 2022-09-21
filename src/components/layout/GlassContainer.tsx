import React from "react";
import { glassContainerType } from "../../types/common";

function GlassContainer({ children }: glassContainerType) {
  return (
    <div className="flex align-middle flex-col p-2  md:p-4 h-full bg-stone-50  
    lg:w-9/12 2xl:w-10/12
     ">
      <main>{children}</main>
    </div>
  );
}

export default GlassContainer;
