import React from "react";
import { glassContainerType } from "../../types/common";

function GlassContainer({ children }: glassContainerType) {
  return (
    <div className="glassContainer">
      <main>{children}</main>
    </div>
  );
}

export default GlassContainer;
