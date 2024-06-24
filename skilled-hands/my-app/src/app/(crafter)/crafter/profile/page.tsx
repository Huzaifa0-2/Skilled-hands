import ProfileData from "@/app/components/crafter/ProfileData";
import { ProfileForm } from "@/app/components/crafter/ProfileForm";
import { Button } from "@/components/ui/button";
import { Crafter } from "@/lib/types";
import { SignIn, auth } from "@clerk/nextjs";
import axios from "axios";

const page = async () => {
  const { userId } = auth();
  const emptyDefaultValues: Crafter = {
    id: "",
    name: "",
    bio: "",
    domain: "",
    contact: "",
    location: "",
    reviews: [],
  };

  const profileData: Crafter | null = userId
    ? (
        await axios.get(
          `${process.env.PORT_URL}/api/crafter/profile?id=${userId}`
        )
      ).data
    : null;

  return (
    <div>
      {userId ? (
        profileData == null ? (
          <div>
            <h1 className="text-center text-3xl font-medium opacity-70">
              Create Profile{" "}
            </h1>
            <ProfileForm
              initialProfileData={emptyDefaultValues}
              update={false}
            />
          </div>
        ) : (
          <div>
            {/* <p className="text-center">Your Profile</p> */}
            <ProfileData />
          </div>
        )
      ) : (
        <div className="flex items-center justify-center">
          <SignIn
            afterSignInUrl={"/crafter/profile"}
            afterSignUpUrl={"/crafter"}
          />
        </div>
      )}
    </div>
  );
};

export default page;
