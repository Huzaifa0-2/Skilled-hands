import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import {
  addDoc,
  Firestore,
  doc,
  documentId,
  setDoc,
  getDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";

/**
 * PATCH => {BASE_URL}/api/user/review?id={crafter_id}&review={review}
 * Updates the crafter profile with the user review submitted.
 */

export async function PATCH(request: NextRequest) {
  const msg = {
    message: "User review posted!",
  };

  try {
    const crafterId = request.nextUrl.searchParams.get("id");
    const review = request.nextUrl.searchParams.get("review");
    if (crafterId && review) {
      const q = query(collection(db, "crafters"), where("id", "==", crafterId));
      const crafterQuerySnapshot = await getDocs(q);
      if (!crafterQuerySnapshot.empty) {
        const crafterDocRef = crafterQuerySnapshot.docs[0].ref;
        await updateDoc(crafterDocRef, {
          reviews: arrayUnion(Number(review)),
        });
        return NextResponse.json(msg);
      }
    } else {
      return NextResponse.json({ message: "Id or Review not found :/" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error storing User Review" });
  }
}
