"use client";
import { Crafter, Job, Proposal } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { proposalFormSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ProposalExtend extends Proposal {
  crafterName: string;
}

interface JobCardProps {
  job: Job;
  isCrafterVerified?: boolean;
  isUserVerified?: boolean;
  variant: "small" | "large";
  proposals?: ProposalExtend[];
}

export function JobCard({ props }: { props: JobCardProps }) {
  const { job, variant, isCrafterVerified, isUserVerified, proposals } = props;
  const { userId } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewProposalDialogOpen, setIsViewProposalDialogOpen] =
    useState(false);
  const [crafterData, setCrafterData] = useState<Crafter | undefined>(
    undefined
  );
  const [hasSentProposal, setHasSentProposal] = useState<boolean | null>(null);
  const [crafterAvgRating, setCrafterAvgRating] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { title, desc, location, pay } = job;

  useEffect(() => {
    const fetchHasSentProposal = async () => {
      const response = await axios.get(
        `/api/crafter/verify/proposal?id=${userId}&job_id=${job.id}`
      );
      setHasSentProposal(response.data.hasSentProposal);
    };
    if (hasSentProposal === null) {
      fetchHasSentProposal();
    }
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleJobApply = async () => {
    if (!isCrafterVerified) {
      toast.error("You are not a crafter yet!");
      router.push("/crafter/profile");
    } else {
      setIsDialogOpen(true);
      console.log("You are crafter already!");
    }
  };

  const proposalForm = useForm<z.infer<typeof proposalFormSchema>>({
    resolver: zodResolver(proposalFormSchema),
  });

  const submitProposal = async (values: z.infer<typeof proposalFormSchema>) => {
    const toastId = toast.loading("Sending proposal...");
    try {
      const alreadySubmitted: boolean = (
        await axios.get(`/api/crafter/proposal/crafter/${userId}`)
      ).data;
      if (!alreadySubmitted) {
        const response = await axios.post("/api/crafter/proposal", {
          jobId: job.id,
          crafterId: userId,
          proposal: values.proposal,
        });
        if (response.status === 200) {
          toast.success("Proposal sent successfully.");
          // toast.dismiss();
        } else {
          toast.error("Error sending proposal.");
          // toast.dismiss();
        }
      } else {
        toast.error("You have already submitted the proposal.");
        // toast.dismiss()
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const hireCrafter = async () => {
    try {
      toast.loading("Placing order...");
      const orderData = {
        jobId: job.id,
        userId: userId,
        crafterId: crafterData!.id,
        status: "pending",
      };
      const postOrderResponse = await axios.post(`/api/user/order`, orderData);
      console.log(postOrderResponse);
      toast.dismiss();
      toast.success("Crafter hired successfully!");
      router.replace(`/jobs`);
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Error placing order...");
    }
  };

  const fetchAndSetCrafterData = async (crafterId: string) => {
    try {
      toast.loading("Getting crafter data...");
      const _crafterData: Crafter | null = (
        await axios.get(`/api/crafter/profile?id=${crafterId}`)
      ).data;
      console.log(_crafterData);
      setCrafterData(_crafterData!);

      let avgRating = 0;
      if (_crafterData && _crafterData.reviews) {
        let revSum = 0;
        _crafterData.reviews.map((rev: number) => (revSum += rev));
        avgRating = revSum / _crafterData.reviews.length;
      }
      console.log("crafter avg rating: ", avgRating);
      setCrafterAvgRating(Number(avgRating.toFixed(2)));
      toast.dismiss();
    } catch (error) {
      toast.error("Error fetching crafter data");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center space-y-5">
      {variant === "small" ? (
        <Link href={`/job/${job.id}`}>
          <Card className="w-[350px] h-[180px] bg-opacity-50 bg-sky-100 hover:shadow-2xl duration-200">
            <CardHeader>
              <CardTitle className="text-nowrap overflow-hidden overflow-ellipsis">
                {title}
              </CardTitle>
              <CardDescription className="text-nowrap overflow-hidden overflow-ellipsis pt-2">
                {desc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-nowrap overflow-hidden overflow-ellipsis">
                {location}
              </p>
              <p>
                Budget - {pay} <span className="text-md font-semibold">RS</span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </Link>
      ) : (
        <Card className="w-[350px] bg-opacity-50 bg-sky-100 shadow-2xl duration-200">
          <CardHeader>
            <CardTitle className="">{title}</CardTitle>
            <CardDescription className="pt-2">{desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="">{location}</p>
            <p>
              Budget - {pay} <span className="text-md font-semibold">RS</span>
            </p>
          </CardContent>
          <CardFooter className="flex space-x-5">
            <Button onClick={handleJobApply} disabled={hasSentProposal!}>
              Apply
            </Button>
            <Button
              onClick={() => {
                proposals!==null?setIsViewProposalDialogOpen(true):null;
                proposals === null ? toast.error("No proposals yet.") : null;
              }}
            >
              View Proposals
            </Button>
          </CardFooter>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogTrigger asChild />
        <DialogContent className="sm:max-w-[425px]">
          <Form {...proposalForm}>
            <form onSubmit={proposalForm.handleSubmit(submitProposal)}>
              <DialogHeader>
                <DialogTitle>Apply For Job</DialogTitle>
                <DialogDescription>
                  Fill the below form to send your proposal for this job.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid w-full gap-3">
                  <Label htmlFor="message-2">Your Proposal</Label>
                  <FormField
                    control={proposalForm.control}
                    name="proposal"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your proposal"
                            id="message-2"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <p className="text-sm text-muted-foreground">
                    Your proposal will be sent to the client.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                >
                  Send proposal
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isViewProposalDialogOpen}
        onOpenChange={() => setIsViewProposalDialogOpen(false)}
      >
        <DialogTrigger asChild />
        <DialogContent>
          {/* <ScrollArea
            className="h-[50px] w-[350px] rounded-md border p-4"
          > */}
          {/* <div> */}
          {proposals
            ? proposals.map((proposal: ProposalExtend, index: number) => (
                <div className="space-y-3" key={index}>
                  <DialogHeader
                    onClick={() => {
                      router.push(
                        "?" + createQueryString("hire", proposal.crafterId)
                      );
                      fetchAndSetCrafterData(proposal.crafterId);
                    }}
                    className="cursor-pointer hover:text-gray-700"
                  >
                    <DialogTitle>{proposal.crafterName}</DialogTitle>
                    <DialogDescription>{proposal.proposal}</DialogDescription>
                  </DialogHeader>
                </div>
              ))
            : null}
          {/* </div> */}
          {/* </ScrollArea> */}
        </DialogContent>
      </Dialog>

      <Dialog
        open={searchParams.has("hire") && searchParams.get("hire") !== ""}
        onOpenChange={() => router.push("?" + createQueryString("hire", ""))}
      >
        <DialogTrigger asChild />
        {crafterData && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{crafterData.name}</DialogTitle>
              <DialogDescription className="space-y-2 pt-3">
                <div>{crafterData.domain}</div>
                <div>{crafterData.location}</div>
                <div className="flex gap-x-2">
                  Rating{" "}
                  {crafterAvgRating === 0 ? "No Rating" : crafterAvgRating}
                  <Star className="w-5 h-5" />
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Link href={`/crafter/profile/${crafterData.id}`} target="_blank">
                <Button>View Profile</Button>
              </Link>
              <Button onClick={hireCrafter}>Hire</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
