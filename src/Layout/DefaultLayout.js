import React from "react";
import SideBar from "../components/newCreated/SideBar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <SideBar />
      <section className="flex-1  relative overflow-x-auto no-scrollbar mt-5 p-3">
        <Outlet /> {/* The content for each route will be displayed here */}
      </section>
    </>
  );
};

export default DefaultLayout;
