import { Order } from "@/lib/types";
import { OrderCard } from "./OrderCard";
import { OrderExtend } from "../()/orders/page";

const DisplayJobs = async ({ ordersData }: { ordersData: OrderExtend[] }) => {
  return ordersData !== null ? (
    <div className="space-y-8">
      <p className="text-3xl pl-5">Your Orders</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-6">
        {ordersData.length > 0 ? (
          ordersData.map((order: OrderExtend) => (
            <OrderCard order={order} key={order.id} />
          ))
        ) : (
          <div className="flex text-center items-center justify-center my-[9rem]">
            <p className="lg:text-6xl text-4xl font-medium text-slate-700 flex items-center text-center opacity-50">
              You have no orders yet!
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex text-center items-center justify-center my-[9rem]">
      <p className="lg:text-6xl text-4xl font-medium text-slate-700 flex items-center text-center opacity-50">
        You have no orders yet!
      </p>
    </div>
  );
};

export default DisplayJobs;
