"use client";
import { Crafter } from "@/lib/types";
import axios from "axios";
import { BookmarkCheck, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";

export function Hero() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Crafter[]>([]);
  const pathName = usePathname();

  const handleSearch = async () => {
    const toastId: string = toast.loading(
      "Getting crafters based on domain..."
    );
    try {
      const response: Crafter[] = (
        await axios.get(`/api/crafter/domain?domain=${search}`)
      ).data;
      setSearchResults(response);
      response !== null
        ? toast.success("Scroll down for the results.")
        : toast.error("No Crafter found.");
    } catch (error) {
      toast.error("Error searching domain.");
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <div className="flex flex-wrap pt-2">
        <div className="lg:w-3/6 w-full sm:p-2 h-full flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col ">
          <h1 className="md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black lg:text-left text-center ">
            Empovering <span className="text-indigo-600"> Skills </span>{" "}
            Transforming <span className="text-indigo-600"> Lives.</span>{" "}
          </h1>
          <p className="md:text-lg sm:text-sm text-xs mb-10 text-gray-500">
            Hire the most experienced workers in your area!
          </p>
          <div className="lg:bg-white flex-col mb-6 w-full md:px-4 py-2 flex sm:flex-row items-center justify-center gap-y-3">
            <Search className="text-2xl text-indigo-600 mx-2 hidden sm:flex" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="What do you want?"
              className="xs:w-full w-3/4  h-full px-2 bg-gray-200 text-base py-3 outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-3 py-2 my-2 sm:my-0 border border-indigo-600 rounded uppercase tracking-widest mx-4   text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600"
            >
              Search
            </button>
          </div>
          <div className=" w-full px-6 flex items-center justify-start flex-wrap">
            <div className="flex items-center justify-center">
              <BookmarkCheck className="text-indigo-600 text-xl mx-2" />
              <h1 className="font-semibold text-lg">Suggested : </h1>
            </div>
            <div className="flex before:items-center justify-center px-4 flex-wrap">
              <p className="px-2  text-gray-600">Electrician</p>
              <p className="px-2  text-gray-600">Plumber</p>
              <p className="px-2  text-gray-600">Painter</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex">
          <Image width={600} height={700} src="/worker.png" alt="hero-img" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-0">
          {searchResults &&
            searchResults.map((crafter: Crafter, index: number) => (
              <Card className="m-4 md:m-2 lg:m-20 opacity-80" key={index}>
                <CardHeader>
                  <CardTitle>{crafter.name}</CardTitle>
                  <CardDescription className="space-y-2">
                    <p>{crafter.domain}</p>
                    <p>{crafter.location}</p>
                    <p>{crafter.contact}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
