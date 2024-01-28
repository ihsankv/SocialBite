import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";
//SocialBite

// Hype Connect 
//EchoSync
interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link : string
}
const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
    link: "/",

  },
  {
    title: "Explore",
    icon: <BiHash />,
    link: "/",
  },
  {
    title: "Notifications",
    icon: <BsBell />,
    link: "/",
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
    link: "/",
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
    link: "/",
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
    link: "/",
  },
  {
    title: "Profile",
    icon: <BiUser />,
    link: `/`,
    // link: `/${user?.id}`,
  },
  {
    title: "More",
    icon: <SlOptions />,
    link: "/",
  },
];
export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-28">
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                key={item.title}>
                  {/* <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                      href={item.link}
                    > */}
                  <span >{item.icon}</span>
                  <span>{item.title}</span>
                  {/* </Link> */}
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>
                <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  <BsTwitter />
                </button>
              </div>
          </div>
        </div>
        <div className="col-span-5  border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}