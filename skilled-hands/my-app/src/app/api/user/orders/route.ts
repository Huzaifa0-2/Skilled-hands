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
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET => {BASE_URL}/api/user/orders
 * returns all orders.
 */

// View All Orders With Details
export async function GET() {
  try {
    const ordersDetailsSnapshot = await getDocs(collection(db, "orders"));
    if (!ordersDetailsSnapshot.empty) {
      const orderDetailsData = ordersDetailsSnapshot.docs.map((doc) =>
        doc.data()
      );
      return NextResponse.json(orderDetailsData);
    } else {
      return NextResponse.json({ message: "No Order Details Found" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
