import { JobForm } from "@/app/components/JobForm";
import { SignIn, auth } from "@clerk/nextjs";

export default function page() {
  const { userId } = auth();
  return userId ? (
    <div className="p-6">
      <JobForm userId={userId}/>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <SignIn />
    </div>
  );
}
