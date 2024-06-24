import { db } from "@/firebase";
import { Order } from "@/lib/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET => {BASE_URL}/api/user/orders/{userId}
 * returns all orders of a specific user.
 */

// View All Orders Of Specific User
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const orders = await Promise.all(
      querySnapshot.docs.map(async (_doc) => {
        const orderData = _doc.data();

        // Fetch user details using userId
        const crafterDocRef = doc(db, "crafters", orderData.crafterId);
        const crafterDocSnapshot = await getDoc(crafterDocRef);

        if (crafterDocSnapshot.exists()) {
          const crafterData = crafterDocSnapshot.data();
          return {
            ...orderData,
            crafterName: crafterData.name, 
          };
        } else {
          return orderData;
        }
      })
    );

    if (!querySnapshot.empty) {
      return NextResponse.json(orders);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}