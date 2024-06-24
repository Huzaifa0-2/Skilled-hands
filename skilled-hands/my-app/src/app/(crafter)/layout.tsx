import { ClerkProvider } from "@clerk/nextjs";
import { NavBar } from "@/app/components/Navbar";
import "../globals.css";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Skilled Hands</title>
      </head>
      <ClerkProvider>
        <body className="bg-gradient-to-l from-cyan-500 to-sky-100 h-full">
          <Toaster position="top-center" />
          <NavBar pannel="crafter"/>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
