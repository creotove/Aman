import React, { useContext, useState } from "react";
import homeIconHollow from "../../assets/icons/hollow-homeIcon.svg";
import peopleIconHollow from "../../assets/icons/hollow-peopleIcon.svg";
import sewingIconHollow from "../../assets/icons/hollow-sewingMachineIcon.svg";
import fabricIconHollow from "../../assets/icons/hollow-fabricIcon.svg";
import profileIconHollow from "../../assets/icons/hollow-userIcon.svg";
import homeIconFilled from "../../assets/icons/fill-homeIcon.svg";
import peopleIconFilled from "../../assets/icons/fill-peopleIcon.svg";
import sewingIconFilled from "../../assets/icons/fill-sewingMachineIcon.svg";
import fabricIconFilled from "../../assets/icons/fill-fabricIcon.svg";
import profileIconFilled from "../../assets/icons/fill-userIcon.svg";

import logo from "../../assets/logos/logo-v-white.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../../ComponentCss/SideBar.css";
import UserContext from "../../context/UserContext";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);
  // eslint-disable-next-line
  const navItems = [
    {
      id: 1,
      fillIcon: homeIconFilled,
      hollowIcon: homeIconHollow,
      // text: "Dashboard",
      to: "/",
    },
    {
      id: 2,
      fillIcon: peopleIconFilled,
      hollowIcon: peopleIconHollow,
      // text: "Sold Bill",
      to: "/customers",
    },
    {
      id: 3,
      fillIcon: sewingIconFilled,
      hollowIcon: sewingIconHollow,
      // text: "Stitch Bill",
      to: "/employees",
    },
    {
      id: 4,
      fillIcon: fabricIconFilled,
      hollowIcon: fabricIconHollow,
      // text: "Stitch Bill",
      to: "/clothing-mgmt",
    },
    {
      id: 5,
      fillIcon: profileIconFilled,
      hollowIcon: profileIconHollow,
      // text: "Profile",
      to: "/profile",
    },
  ];

  const [activeItem, setActiveItem] = useState(1);

  const handleItemClick = (itemId, itemTo) => {
    // if (activeItem === itemId) return;
    if (!location.pathname.includes(itemTo) && activeItem === itemId) return;
    setActiveItem(itemId);
    navigate(itemTo);
  };
  // GPT
  React.useEffect(() => {
    const activeItem = navItems.find((item) => {
      const itemPath = item.to;
      return location.pathname === itemPath || location.pathname.includes(itemPath + '/');
    });
    if (activeItem) {
      setActiveItem(activeItem.id);
    }
  }, [location.pathname, navItems]);
    
  
  // // Own
  // React.useEffect(() => {
  //   const activeItem = navItems.find((item) => location.pathname === item.to);
  //   if (activeItem) {
  //     if(activeItem.to === location.pathname.startsWith(activeItem.to))
  //     setActiveItem(activeItem.id);
  //   console.log(activeItem);
  // }else{
  //     console.log('activeItem');
  //     console.log(activeItem);
  //     return
  //   }
   
  // }, [location.pathname, navItems]);

  return (
    <section className="sideBar w-20  sticky top-0 h-screen">
      <section className="h-full">
        <span>
          <span className="text-3xl h-11 w-full flex justify-center">
            <img
              src={logo}
              className="object-contain "
              alt="aman-tailors"
            />
          </span>
          <section className="my-6">
            {navItems.map((item, idx) => (
              <span
                className={`menu_item flex justify-center md:justify-start items-center ${
                  activeItem === item.id ? "active" : ""
                }`}
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  handleItemClick(item.id, item.to);
                }}
              >
                <section className="flex md-block justify-center items-center">
                  <span
                    style={{
                      height: "1.75rem",
                      width: "1.75rem",
                    }}
                  >
                    <img
                      style={{
                        objectFit: "contain",
                      }}
                      src={
                        activeItem === item.id ? item.fillIcon : item.hollowIcon
                      }
                      alt=""
                    />
                  </span>
                </section>
                {/* <div className="menu_item_text text-center hidden md:block ms-6">
                  {item.text}
                </div> */}
              </span>
            ))}
          </section>
        </span>
      </section>{" "}
    </section>
  );
};

export default SideBar;
