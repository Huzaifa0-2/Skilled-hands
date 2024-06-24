import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NavbarLink } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const crafterNavbarLinks: NavbarLink[] = [
  {
    name: "Profile",
    path: "/crafter/profile",
  },
  {
    name: "You",
    path: "/crafter/profile",
  }
];

export const userNavLinks: NavbarLink[] = [
  {
    name: "Post Jobs",
    path: "/jobs/create",
  },
  {
    name: "Explore Jobs",
    path: "/jobs",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Crafters",
    path: "/crafters",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];
