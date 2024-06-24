"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavbarLink } from "@/lib/types";
import { crafterNavbarLinks, userNavLinks } from "@/lib/utils";
import { SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: '400'
})

export function NavBar({ pannel }: { pannel: "crafter" | "main"}) {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();

  return (
      <div className={`py-[2rem] ${ubuntu.className}`}>
      <div className="hidden lg:block">
        <div className="flex items-center justify-between space-x-20 px-[6rem]">
          <Link href="/" className={`text-lg`}>
            Skilled Hands
          </Link>
          <div className="flex space-x-4">
            {(pannel === "crafter" ? crafterNavbarLinks : userNavLinks).map(
              (link: NavbarLink, index: number) => (
                <NavigationMenu key={index} orientation="horizontal">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href={link.name.toLowerCase() === "you"?`/crafter/profile/${userId}`:link.path} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {link.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )
            )}
          </div>
          <div>
            {!userId ? (
              <SignInButton mode="modal" />
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-[6rem] lg:hidden">
        <Link href="/" className="text-lg font-medium">
          Skilled Hands
        </Link>
        <div className="text-right">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-[230px]">
              <SheetHeader className="gap-y-1">
                {(pannel === "crafter" ? crafterNavbarLinks : userNavLinks).map(
                  (link: NavbarLink, index: number) => (
                    <SheetTitle
                      className=" text-lg"
                      key={index}
                      onClick={() => setOpen(false)}
                    >
                      <Link href={link.path}>{link.name}</Link>
                    </SheetTitle>
                  )
                )}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
