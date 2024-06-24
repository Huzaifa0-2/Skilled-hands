import { db } from "@/firebase";
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET => {BASE_URL}/api/crafter/proposal/{jobId}
 * @returns all proposals on a particular job
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;
    const q = query(collection(db, "proposals"), where("jobId", "==", jobId));
    const querySnapshot = await getDocs(q);
    const proposals = await Promise.all(
      querySnapshot.docs.map(async (_doc) => {
        const proposalData = _doc.data();

        // Fetch crafter details using crafterId
        const crafterDocRef = doc(db, "crafters", proposalData.crafterId);
        const crafterDocSnapshot = await getDoc(crafterDocRef);

        if (crafterDocSnapshot.exists()) {
          const crafterData = crafterDocSnapshot.data();
          return {
            ...proposalData,
            crafterName: crafterData.name, // Adjust this based on your crafter data structure
          };
        } else {
          return proposalData; // Use the original proposal data if crafter data not found
        }
      })
    );

    if (!querySnapshot.empty) {
      return NextResponse.json(proposals);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}
