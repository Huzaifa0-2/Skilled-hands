import { db } from "@/firebase";
import { Job } from "@/lib/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET => {BASE_URL}/api/user/jobs
 * returns all jobs.
 */

// View All Jobs With Details
export async function GET() {
  try {
    const jobsDetailsSnapshot = await getDocs(collection(db, "jobs"));
    if (!jobsDetailsSnapshot.empty) {
      const jobDetailsData = jobsDetailsSnapshot.docs.map((doc) => doc.data());
      return NextResponse.json(jobDetailsData);
    } else {
      return NextResponse.json({ message: "No Job Details Found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
