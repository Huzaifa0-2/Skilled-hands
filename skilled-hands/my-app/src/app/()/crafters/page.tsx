import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crafter } from "@/lib/types";
import axios from "axios";
import Link from "next/link";

const page = async () => {
  const crafters: Crafter[] = (
    await axios.get(`${process.env.PORT_URL}/api/crafter/profiles`)
  ).data;
  return (
    <div className="px-[6rem] space-y-12">
      <p className="text-3xl">Explore Crafters</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 lg:p-0">
        {crafters.map((crafter: Crafter, index: number) => (
          <Link href={`/crafter/profile/${crafter.id}`} className="" key={index}>
            <Card className="opacity-80">
              <CardHeader>
                <CardTitle>{crafter.name}</CardTitle>
                <CardDescription className="space-y-2">
                  <p>{crafter.domain}</p>
                  <p>{crafter.location}</p>
                  <p>{crafter.contact}</p>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
