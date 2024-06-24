import { db } from "@/firebase";
import { Crafter } from "@/lib/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET
 * returns the list of crafters based on the domain
 * {BASE_URL}/api/crafter/domain?domain={domain}
 */

export async function GET(request: NextRequest) {
  try {
    const domain = request.nextUrl.searchParams.get("domain");
    // const q = query(collection(db, "crafters"), where("domain", "==", domain));
    const startAt = domain;
    const endAt = domain + "\uf8ff";
    const q = query(
      collection(db, "crafters"),
      where("domain", ">=", startAt),
      where("domain", "<=", endAt)
    );
    const querySnapshot = await getDocs(q);
    const crafters = querySnapshot.docs.map((doc) => doc.data());
    if (!querySnapshot.empty) {
      return NextResponse.json(crafters);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
