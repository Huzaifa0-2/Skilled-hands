import { db } from "@/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET => {BASE_URL}/api/user/verify?id={userId}
 * verify if the user has posted a job or not
 */

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    const q = query(collection(db, "jobs"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return NextResponse.json({ userId: userId }); // the job was posted by the user
    } else {
      return NextResponse.json({ userId: undefined });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
