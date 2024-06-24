import { Job, Proposal } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { JobCard } from "./JobCard";

const DisplayJobs = async ({ jobsData }: { jobsData: Job[] }) => {
  return (
    <div className="space-y-12">
      <p className="pl-4 text-3xl font-medium text-slate-700">Available Jobs</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-y-6">
        {jobsData.length > 0 ? (
          jobsData.map((job) => (
            <JobCard props={{ job, variant: "small" }} key={job.id} />
          ))
        ) : (
          <div className="flex items-center justify-center min-w-max lg:pl-[20rem] lg:pt-[6rem] pt-[4rem]">
            <p className="lg:text-6xl text-3xl font-bold opacity-45 text-gray-500 ">
              No Jobs Available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayJobs;
