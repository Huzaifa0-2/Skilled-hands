import CrafterData from "@/app/components/crafter/CrafterData";
import axios from "axios";

const page = async ({ params }: { params: { crafterId: string } }) => {
  const { crafterId } = params;
  //showing
  const profile = (
    await axios.get(
      `${process.env.PORT_URL}/api/crafter/profile?id=${crafterId}`
    )
  ).data;
  //showing post
  // const posts = (
  //   await axios.get(`${process.env.PORT_URL}/api/crafter/post?id=${crafterId}`)
  // ).data;

  return (
    <div>
      {profile ? (
        <CrafterData props={{ profile }} />
      ) : (
        <div className="flex text-center items-center justify-center my-[9rem]">
          <p className="lg:text-6xl text-4xl font-medium text-slate-700 flex items-center text-center opacity-50">
            Profile not found
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
