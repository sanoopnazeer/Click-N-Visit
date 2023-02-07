// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

import BannerImage from "../assets/images/doctor-team.jpg"

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    page: "dashboard",
  },
  {
    icon: UilPackage,
    heading: "Approvals",
    page: "approvals"
  },
  {
    icon: UilClipboardAlt,
    heading: "Categories",
    page: "categories",
  },
  {
    icon: UilUsersAlt,
    heading: "User Management",
    page: "users",
  },
  {
    icon: UilUsersAlt,
    heading: "Doctor Management",
    page: "doctors"
  },
  // {
  //   icon: UilUsersAlt,
  //   heading: "Lawyer Management",
  //   page: "lawyers"
  // },
  {
    icon: UilUsersAlt,
    heading: "Teacher Management",
    page: "teachers"
  },
  // {
  //   icon: UilUsersAlt,
  //   heading: "Trainer Management",
  //   page: "trainers"
  // },
];
