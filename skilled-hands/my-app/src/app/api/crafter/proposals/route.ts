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
 * GET => {BASE_URL}/api/crafter/proposals
 * @returns All proposals of all jobs
 */

// View All Proposals
export async function GET() {
  try {
    const proposalsSnapshot = await getDocs(collection(db, "proposals"));
    if (!proposalsSnapshot.empty) {
      const proposalsData = proposalsSnapshot.docs.map((doc) => doc.data());
      return NextResponse.json(proposalsData);
    } else {
      return NextResponse.json({ message: "No Proposal Found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
