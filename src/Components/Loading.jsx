import React from "react";
import { Circles } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loading z-3 ">
      <Circles ariaLabel="circles-loading" width="200" color="#4fa94d" />
    </div>
  );
}
