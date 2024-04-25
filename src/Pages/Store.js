import React, { useState } from "react";
import Fabric from "../components/newCreated/Store/Fabric";
import WholeSale from "../components/newCreated/Store/WholeSale";

const Store = () => {
  const [active, setActive] = useState(1);
  return (
    <section>
      <nav className="flex justify-end mb-4 sticky">
        <ul className="flex gap-2">
          <li onClick={()=>setActive(1)}className={`py-2 px-4 cursor-pointer radius ${active === 1 ? 'active' : ''} nav_item hover:bg-[#1b1b1b]`}>Fabric</li>
          <li onClick={()=>setActive(2)}className={`py-2 px-4 cursor-pointer radius ${active === 2 ? 'active' : ''} nav_item hover:bg-[#1b1b1b]`}>Whole Sale</li>
        </ul>
      </nav>
      
        {active === 1 ? (
          <Fabric />
        ) : (
          <WholeSale />
        )}
      
    </section>
  );
};

export default Store;
