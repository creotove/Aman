import React, { useState } from "react";
import homeIconHollow from "../../assets/icons/hollow-homeIcon.svg";
import peopleIconHollow from "../../assets/icons/hollow-peopleIcon.svg";
import sewingIconHollow from "../../assets/icons/hollow-sewingMachineIcon.svg";
import fabricIconHollow from "../../assets/icons/hollow-fabricIcon.svg";
import storeIconHollow from "../../assets/icons/hollow-storeIcon.svg";
import profileIconHollow from "../../assets/icons/hollow-userIcon.svg";
import homeIconFilled from "../../assets/icons/fill-homeIcon.svg";
import peopleIconFilled from "../../assets/icons/fill-peopleIcon.svg";
import sewingIconFilled from "../../assets/icons/fill-sewingMachineIcon.svg";
import fabricIconFilled from "../../assets/icons/fill-fabricIcon.svg";
import storeIconFilled from "../../assets/icons/fill-storeIcon.svg";
import profileIconFilled from "../../assets/icons/fill-userIcon.svg";
import logo from "../../assets/logos/logo-v-white.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../../ComponentCss/SideBar.css";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

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
      // text: "Customers",
      to: "/customers",
    },
    {
      id: 3,
      fillIcon: sewingIconFilled,
      hollowIcon: sewingIconHollow,
      // text: "Employees",
      to: "/employees",
    },
    {
      id: 4,
      fillIcon: fabricIconFilled,
      hollowIcon: fabricIconHollow,
      // text: "Clothing Mgmt",
      to: "/clothing-mgmt",
    },
    {
      id: 5,
      fillIcon: storeIconFilled,
      hollowIcon: storeIconHollow,
      // text: "Stitch Bill",
      to: "/store",
    },
    {
      id: 6,
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

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    document.body.className = newTheme ? 'dark-theme' : 'light-theme';
  };

  React.useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

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
    <section className="sideBar w-20 sticky top-0 h-screen">
      <section className="h-full flex flex-col">
        <span className="flex-1">
          <span className="text-3xl h-11 w-full flex justify-center">
            <img
              src={logo}
              className="object-contain"
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
              </span>
            ))}
          </section>
        </span>
        
        {/* Theme Toggle Button */}
        <div className="theme-toggle-container">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
          >
            {isDarkTheme ? (
              // Sun icon for light theme
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM2 13H4C4.55 13 5 12.55 5 12C5 11.45 4.55 11 4 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13ZM20 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20C19.45 11 19 11.45 19 12C19 12.55 19.45 13 20 13ZM11 2V4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2ZM11 20V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20C13 19.45 12.55 19 12 19C11.45 19 11 19.45 11 20ZM5.99 4.58C5.6 4.19 5.6 3.56 5.99 3.17C6.38 2.78 7.01 2.78 7.4 3.17L8.81 4.58C9.2 4.97 9.2 5.6 8.81 5.99C8.42 6.38 7.79 6.38 7.4 5.99L5.99 4.58ZM18.36 16.95C17.97 16.56 17.97 15.93 18.36 15.54C18.75 15.15 19.38 15.15 19.77 15.54L21.18 16.95C21.57 17.34 21.57 17.97 21.18 18.36C20.79 18.75 20.16 18.75 19.77 18.36L18.36 16.95ZM19.77 5.99C20.16 6.38 20.16 7.01 19.77 7.4L18.36 8.81C17.97 9.2 17.34 9.2 16.95 8.81C16.56 8.42 16.56 7.79 16.95 7.4L18.36 5.99C18.75 5.6 19.38 5.6 19.77 5.99ZM8.81 18.36C8.42 18.75 7.79 18.75 7.4 18.36L5.99 16.95C5.6 16.56 5.6 15.93 5.99 15.54C6.38 15.15 7.01 15.15 7.4 15.54L8.81 16.95C9.2 17.34 9.2 17.97 8.81 18.36Z" fill="currentColor"/>
              </svg>
            ) : (
              // Moon icon for dark theme
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.34 2.02C6.59 2.02 2 6.61 2 12.36C2 18.11 6.59 22.7 12.34 22.7C15.73 22.7 18.84 21.12 20.83 18.65C21.34 18.03 20.96 17.07 20.16 17.07C19.84 17.07 19.53 17.18 19.27 17.39C17.57 18.59 15.39 19.28 13.08 19.28C8.58 19.28 4.98 15.68 4.98 11.18C4.98 7.56 7.2 4.46 10.38 3.29C11.1 3.01 11.02 1.98 10.22 1.98C10.15 1.98 10.08 1.99 10.01 2.0C9.46 2.01 8.9 2.02 8.34 2.02H12.34Z" fill="currentColor"/>
              </svg>
            )}
          </button>
        </div>
      </section>
    </section>
  );
};

export default SideBar;