/**
 * POST => {BASE_URL}/api/crafter/profile
 * Store crafter profile.
 * GET => {BASE_URL}/api/crafter/profile?id={crafter_id}
 * Returns crafter profile.
 * PATCH => {BASE_URL}/api/crafter/profile
 * Updates crafter profile.
 */

import { db } from "@/firebase";
import { Crafter } from "@/lib/types";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const obj = {
  message: "Profile data stored!",
};

export async function POST(request: NextRequest) {
  const data: Crafter = await request.json();
  console.log(data);
  const dataDocumentReference = doc(db, "crafters", data.id);
  await setDoc(dataDocumentReference, data, { merge: true });
  return NextResponse.json(obj);
}

// for single search profile
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id !== null) {
    const crafterProfileRef = doc(db, "crafters", id);
    const crafterProfileData: Crafter = (
      await getDoc(crafterProfileRef)
    ).data() as Crafter;
    if (crafterProfileData) {
      return NextResponse.json(crafterProfileData);
    } else {
      return NextResponse.json(null);
    }
  } else {
    return NextResponse.json({ message: "id not found" });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data: Crafter = await request.json();
    const { id, ...updateData } = data;

    const dataDocumentReference = doc(db, "profile", id);
    const existingDataSnapshot = await getDoc(dataDocumentReference);

    if (existingDataSnapshot.exists()) {
      // If the document exists, update it
      await updateDoc(dataDocumentReference, updateData);
      console.log("doc exist");
      return NextResponse.json({ message: "Profile updated successfully" });
    } else {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
