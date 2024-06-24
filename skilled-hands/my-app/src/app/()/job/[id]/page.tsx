import { JobCard, ProposalExtend } from "@/app/components/JobCard";
import { verifyCrafter, verifyUser } from "@/app/server/server";
import { Skeleton } from "@/components/ui/skeleton";
import { Job, Proposal } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = async ({ params }: { params: { id: string } }) => {
  const {userId} = auth()
  const jobData: Job = (
    await axios.get(`${process.env.PORT_URL}/api/user/job?id=${params.id}`)
  ).data;
  const isCrafterVerified: boolean = (await verifyCrafter(userId!)) !== undefined;
  const isUserVerified: boolean = (await verifyUser(userId!)) !== undefined;
  const jobProposals: ProposalExtend[] = (
    await axios.get(`${process.env.PORT_URL}/api/crafter/proposal/${params.id}`)
  ).data;

  return (
    <div className="flex items-center justify-center">
      {jobData ? (
        <JobCard
          props={{
            job: jobData,
            isCrafterVerified,
            isUserVerified,
            variant: "large",
            proposals: jobProposals
          }}
        />
      ) : (
        <p>Job Data Not Available</p>
      )}
    </div>
  );
};

export default page;
