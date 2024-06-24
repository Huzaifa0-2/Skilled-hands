import DisplayOrders from "@/app/components/DisplayOrders";
import { Order } from "@/lib/types";
import { SignIn, auth } from "@clerk/nextjs";
import axios from "axios";

export interface OrderExtend extends Order {
  crafterName: string;
}

export default async function page() {
  const { userId } = auth();
  
  const orders: OrderExtend[] = userId?(await axios.get(`${process.env.PORT_URL}/api/user/orders/${userId}`)).data:[];

  return userId ? (
    <div className="pt-5 px-20">
      <DisplayOrders ordersData={orders} />
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <SignIn />
    </div>
  );
}
