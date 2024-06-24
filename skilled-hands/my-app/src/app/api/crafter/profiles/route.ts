import { db } from "@/firebase";
import { Crafter } from "@/lib/types";
import {
  doc,
  query,
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET => {BASE_URL}/api/crafter/profiles
 * @returns profiles of all crafters
 */

export async function GET() {
  try {
    // Construct a reference to the "profile" collection in Firestore
    const querySnapshot = await getDocs(collection(db, "crafters"));
    const profiles: DocumentData[] = querySnapshot.docs.map((doc) =>
      doc.data()
    );
    return NextResponse.json(profiles);
  } catch (error) {
    // Handle errors and return an appropriate response
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
