import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// GET => {DOMAIN}/api/user/verify/proposal?id={userId}
// verify that the crafter has already sent the proposal or not

export async function GET(request: NextRequest) {
  try {
    const crafterId = request.nextUrl.searchParams.get("id");
    const jobId = request.nextUrl.searchParams.get("job_id");
    const q = query(
      collection(db, "proposals"),
      where("crafterId", "==", crafterId),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return NextResponse.json({ hasSentProposal: true }); // the crafter already sent the proposal
    } else {
      return NextResponse.json({ hasSentProposal: false });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
