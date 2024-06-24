import { db } from "@/firebase";
import { Order } from "@/lib/types";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST => {BASE_URL}/api/user/order
 * stores the order details of the user.
 * GET => {BASE_URL}/api/user/order?id={order_id}
 * returns the order details based on the order id.
 * PATCH => {BASE_URL}/api/user/order?id={order_id}
 * updates the order status based on the order id.
 * DELETE => {BASE_URL}/api/user/order?id={order_id}
 * deletes the order based on the order id.
 */


// Order CRUD Operations

// Publish Order Details

export async function POST(request: NextRequest) {
  try {
    const orderDetailsBody: Order = await request.json();
    const orderDetailsData: Order = {
      ...orderDetailsBody,
      date: new Date(),
    };
    const orderCollectionRef = collection(db, "orders");
    const storeOrderDetailsDocRef = await addDoc(
      orderCollectionRef,
      orderDetailsData
    );
    const orderDocRef = doc(db, "orders", storeOrderDetailsDocRef.id);
    const updateorderId = await updateDoc(orderDocRef, {
      id: storeOrderDetailsDocRef.id,
    });
    console.log(storeOrderDetailsDocRef, updateorderId);
    return NextResponse.json({
      message: "Order Posted Successfully",
      data: storeOrderDetailsDocRef.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

// View Single Order With Details
export async function GET(request: NextRequest) {
  try {
    const id: string | null = request.nextUrl.searchParams.get("id");
    if (id) {
      const orderDetailsDocRef: DocumentReference<DocumentData, DocumentData> =
        doc(db, "orders", id);
      const orderDetailsData: DocumentSnapshot<DocumentData, DocumentData> =
        await getDoc(orderDetailsDocRef);
      console.log(orderDetailsData.data());
      if (orderDetailsData.exists()) {
        return NextResponse.json(orderDetailsData.data());
      } else {
        return NextResponse.json({ message: "No Order Details Found" });
      }
    } else {
      return NextResponse.json({ error: "Order id not found :/" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}

export  async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (id) {
      const dataDocumentReference = doc(db, "orders", id);
      const existingDataSnapshot = await getDoc(dataDocumentReference);
      if (existingDataSnapshot.exists()) {
        await updateDoc(dataDocumentReference, {
          status: "completed",
        });
        return NextResponse.json({ message: "Order updated successfully" });
      } else {
        return NextResponse.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "order id not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Cancel Order
export async function DELETE(request: NextRequest) {
  try {
    const orderId: string | null = request.nextUrl.searchParams.get("id");
    if (orderId) {
      const orderDocRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "orders",
        orderId
      );
      await deleteDoc(orderDocRef);
      return NextResponse.json({ messag: `Deleted order with id ${orderId}` });
    } else {
      return NextResponse.json({ message: "id not found:/" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
