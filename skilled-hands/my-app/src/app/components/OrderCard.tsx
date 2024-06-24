"use client";
import { Order } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderExtend } from "../()/orders/page";

export function OrderCard({ order }: { order: OrderExtend }) {
  const { crafterId, date, id, jobId, status, userId, crafterName } = order;

  const [isReviewBoxOpen, setIsReviewBoxOpen] = useState(false);
  const [isFinishBoxOpen, setIsFinishBoxOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const formattedDate: Date = new Date(date.seconds * 1000);

  const cancelOrder = async () => {
    try {
      toast.loading("Cancelling order...");
      await axios.delete(`/api/user/orders?id=${id}`);
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Error cancelling order");
      console.log(error);
    }
  };

  const finishOrder = async () => {
    try {
      const loadToastId = toast.loading("Marking order as completed...");
      await axios.patch(`/api/user/order?id=${id}`);
      toast.dismiss(loadToastId);
      toast.success("Order finished successfully");
      router.replace("/orders");
    } catch (error) {
      toast.dismiss();
      toast.error("Error");
      console.log(error);
    }
  };

  const submitReview = async () => {
    try {
      toast.loading("Posting your review...");
      await axios.patch(
        `/api/user/review?id=${crafterId}&review=${searchParams.get(`rating`)}`
      );
      toast.success("Thanks for the feedback...");
      setIsFinishBoxOpen(true);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error("Error posting review!");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center space-y-5">
      <Card>
        <CardHeader>
          <CardTitle className="space-y-3">
            <div className="flex gap-x-4 items-center">
              <p className="text-lg">{id}</p>
              <p
                className={`text-sm ${
                  status === "pending" ? "text-gray-950" : "text-green-800"
                } ${
                  status === "pending" ? "bg-slate-300" : "bg-green-300"
                } opacity-70 px-3 py-1 rounded-full`}
              >
                {status}
              </p>
            </div>
            <div className="text-sm font-normal space-y-1">
              <p>Crafter - {crafterName}</p>
              <p>Job Id {jobId}</p>
              <p>{formattedDate.toDateString()}</p>
            </div>
          </CardTitle>
          {/* <CardDescription className="">
            <p>sndmsdmn</p>
          
          </CardDescription> */}
        </CardHeader>
        <CardFooter className="gap-x-4">
          {order.status === "pending" ? (
            <Button className="rounded-full" onClick={cancelOrder}>
              Cancel
            </Button>
          ) : null}

          {status === "pending" ? (
            <Button
              className="rounded-full"
              onClick={() => setIsReviewBoxOpen(true)}
            >
              Finish Order
            </Button>
          ) : null}
        </CardFooter>
      </Card>

      <Dialog
        open={isReviewBoxOpen}
        onOpenChange={() => setIsReviewBoxOpen(false)}
      >
        <DialogContent className="w-52 ">
          <DialogHeader className="space-y-4">
            <DialogTitle>Rate Crafter</DialogTitle>
            <DialogDescription className="space-y-4">
              <Input
                type="number"
                onChange={(e: any) => router.push(`?rating=${e.target.value}`)}
              />
              <Button onClick={submitReview}>Rate</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isFinishBoxOpen}
        onOpenChange={() => setIsFinishBoxOpen(false)}
      >
        <DialogContent className="w-56">
          <DialogHeader className="space-y-4">
            <DialogTitle>Finish Order</DialogTitle>
            <DialogDescription>
              <Button onClick={finishOrder}>Finish</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
