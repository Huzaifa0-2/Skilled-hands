import { db } from "@/firebase";
import { Job } from "@/lib/types";
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
 * POST => {BASE_URL}/api/user/job
 * stores the job details of the user.
 * GET => {BASE_URL}/api/user/job?id={job_id}
 * returns the job details based on the job id.
 * PATCH => {BASE_URL}/api/user/job?id={job_id}
 * updates the job details based on the job id.
 * DELETE => {BASE_URL}/api/user/job?id={job_id}
 * deletes the job based on the job id.
 */

// Job CRUD Operations

// Publish Job Details
export async function POST(request: NextRequest) {
  try {
    const jobDetailsBody: Job = await request.json();
    const jobDetailsData: Job = {
      ...jobDetailsBody,
      date: new Date(),
    };
    const jobCollectionRef = collection(db, "jobs");
    const storeJobDetailsDocRef = await addDoc(
      jobCollectionRef,
      jobDetailsData
    );
    const jobDocRef = doc(db, "jobs", storeJobDetailsDocRef.id);
    const updateJobId = await updateDoc(jobDocRef, {
      id: storeJobDetailsDocRef.id,
    });
    console.log(storeJobDetailsDocRef, updateJobId);
    return NextResponse.json({
      message: "Job Posted Successfully",
      data: storeJobDetailsDocRef.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

// View Single Job With Details
export async function GET(request: NextRequest) {
  try {
    const id: string | null = request.nextUrl.searchParams.get("id");
    if (id) {
      const jobDetailsDocRef: DocumentReference<DocumentData, DocumentData> =
        doc(db, "jobs", id);
      const jobDetailsData: DocumentSnapshot<DocumentData, DocumentData> =
        await getDoc(jobDetailsDocRef);
      console.log(jobDetailsData.data());
      if (jobDetailsData.exists()) {
        return NextResponse.json(jobDetailsData.data());
      } else {
        return NextResponse.json({ message: "No Job Details Found" });
      }
    } else {
      return NextResponse.json({ error: "Job id not found :/" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error) });
  }
}

interface JobUpdateBody {
  id: string;
  title: string;
  desc: string;
  location: string;
  contact: number;
  pay?: number;
}

// Update Job Details
export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const { title, desc, location, contact, pay }: JobUpdateBody =
      await request.json();
    if (id) {
      const jobDocRef = doc(db, "jobs", id);
      await updateDoc(jobDocRef, {
        title: title,
        desc: desc,
        location: location,
        contact: contact,
        pay: pay,
      });
      return NextResponse.json({
        message: "Job Updated Successfully",
        data: id,
      });
    } else {
      return NextResponse.json({ error: "Job id not found :/" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "something went wrong!" });
  }
}

// Delete Job Details
export async function DELETE(request: NextRequest) {
  try {
    const jobId: string | null = request.nextUrl.searchParams.get("id");
    if (jobId) {
      const jobDocRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "jobs",
        jobId
      );
      await deleteDoc(jobDocRef);
      return NextResponse.json({ messag: `Deleted job with id ${jobId}` });
    } else {
      return NextResponse.json({ message: "id not found:/" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
