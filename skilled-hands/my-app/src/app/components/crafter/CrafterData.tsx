"use client";

import { Crafter, post } from "@/lib/types";
import { Star } from "lucide-react";

interface CrafterDataProps {
  // posts: post;
  profile: Crafter;
}

const CrafterData = ({ props }: { props: CrafterDataProps }) => {
  const { profile } = props;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-gray-500 shadow-sm rounded-md">
      <p className="text-3xl font-medium mb-4">{profile.name} Profile</p>

      <div className="mb-2">
        <strong className="text-lg">Name:</strong>
        <span className="ml-2">{profile.name}</span>
      </div>

      <div className="mb-2">
        <strong className="text-lg">Bio:</strong>
        <span className="ml-2">{profile.bio}</span>
      </div>

      <div className="mb-2">
        <strong className="text-lg">Domain:</strong>
        <span className="ml-2">{profile.domain}</span>
      </div>

      <div className="mb-2">
        <strong className="text-lg">Location:</strong>
        <span className="ml-2">{profile.location}</span>
      </div>

      <div className="mb-2">
        <strong className="text-lg">Reviews:</strong>
        <div className="flex gap-x-3">
        {
          profile.reviews?profile.reviews.map((rev: number,index: number) => (
            <div className="flex items-center gap-x-1" key={index}>
            <span>{rev}</span>
            <Star className="w-5 h-5" />
            </div>
          )):<p className="font-medium">No Reviews</p>
        }
        </div>
      </div>
    </div>
  );
};

export default CrafterData;
