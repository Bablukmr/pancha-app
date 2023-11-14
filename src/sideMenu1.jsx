import { useState } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  SoundOutlined,
  ExclamationCircleOutlined,
  CarOutlined,
  SettingOutlined,
  ReadOutlined,
  BulbOutlined,
  LockOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/es/menu/MenuItem";
export default function SideMenu() {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const [selected, setSelectedMenu] = useState("1");

  const menuItem = [
    { id: "1", title: "Dashboard", icon: <DashboardOutlined />, link: "" },
    { id: "2", title: "Manual", icon: <ReadOutlined />, link: "" },
    { id: "3", title: "Training", icon: <BulbOutlined />, link: "" },
    { id: "4", title: "News", icon: <SoundOutlined />, link: "" },
    {
      id: "5",
      title: "Report Damage",
      icon: <ExclamationCircleOutlined />,
      link: "",
    },
    { id: "6", title: "Vehicle", icon: <CarOutlined />, link: "" },
    { id: "7", title: "Users", icon: <UserOutlined />, link: "" },
    { id: "8", title: "Settings", icon: <SettingOutlined />, link: "" },
  ];

  const subMmenuItem = [
    { id: "9", title: "Type", link: "" },
    { id: "10", title: "User Role", link: "" },
    { id: "11", title: "Warehouse", link: "" },
    { id: "12", title: "Department", link: "" },
  ];

  return (
    // bg-[#2B3087]
    <div className="w-full h-full bg-[#2b3087]  text-white">
      <div className="z-50 bg-[#2b3087]">
        <ul className=" w-[90%] m-0 p-0 bg-[#2b3087] z-50 list-none font-medium gap-y-2  flex flex-col items-center">
          {menuItem.map((d) => (
            <li
              key={d.id}
              className={` ${
                selected === d.id ? "bg-[#4f54b3]" : "bg-[#2b3087]"
              } z-50 w-[90%] rounded-md h-[40px] flex items-center justify-centerr cursor-pointer
          `}
              onClick={() => {
                setSelectedMenu(d.id);
                if (d.id === "8") {
                  setOpenSubMenu(!openSubMenu);
                }
              }}
            >
              <div className="w-[10%] ml-[10%] bg-[redd]">{d.icon}</div>
              <p
                className={` ${
                  d.id === "8" ? "w-[60%]" : "w-[70%]"
                }  p-0 m-0 pl-2 text-start bg-[greend]`}
              >
                {d.title}
              </p>
              {d.id === "8" && (
                <div className="w-[10%] bg-[orangse] ">
                  {!openSubMenu ? <UpOutlined /> : <DownOutlined />}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <ul
        // className={`w-full bg-[green]   font-medium 
        //        ${
        //          openSubMenu ? "-translate-y-full" : "translate-y-0 "
        //        } transition-all -z-50 duration-500 m-0 p-0 list-none gap-y-0.5 pb-10`}
       
        className={`w-full bg-[#2b3087] font-medium 
        ${
          openSubMenu ? "-translate-y-full invisible  " : "translate-y-0 visible"
        }  transition-all -z-50 duration-500 m-0 p-0 list-none gap-y-0.5 pb-10`}
     
     >
        {subMmenuItem.map((d) => (
          <li
            key={d.id}
            className={` ${
              selected === d.id ? "bg-[#4f54b3]" : ""
            } w-[90%] -z-50 rounded-md h-[40px] flex items-center justify-centerr cursor-pointer
          `}
            onClick={() => {
              setSelectedMenu(d.id);
              if (d.id === "8") {
                setOpenSubMenu(!openSubMenu);
              }
            }}
          >
            <p className="w-[60%] ml-[25%] p-0 m-0 pl-2 text-start">
              {d.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}