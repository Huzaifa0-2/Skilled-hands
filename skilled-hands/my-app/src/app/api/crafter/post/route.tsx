import { db } from "@/firebase";
import { Crafter, Post } from "@/lib/types";
import {
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// /**
//  * GET => {BASE_URL}/api/crafter/post?id={crafter_id}
//  * POST => {BASE_URL}/api/crafter/post
//  * PATCH => {BASE_URL}/api/crafter/post
// **/

export async function POST(request: NextRequest) {
  try {
    const postData: Post = await request.json();
    const postCollectionRef = collection(db, "posts");
    const postDetailsDocRef = await addDoc(postCollectionRef, postData);
    const postDocRef = doc(db, "posts", postDetailsDocRef.id);
    await updateDoc(postDocRef, {
      id: postDetailsDocRef.id,
    });

    return NextResponse.json({ message: "Post uploaded successfully" });
  } catch (error) {
    console.error("Error posting..", error);
    return NextResponse.json({ error: "Something went wrong:/" });
  }
}

export async function GET(request: NextRequest) {
  try {
    const crafterId: string = request.nextUrl.searchParams.get("id") as string;
    if (crafterId != "") {
      const q = query(
        collection(db, "posts"),
        where("crafterId", "==", crafterId)
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => doc.data());
      return NextResponse.json(posts);
    } else {
      return NextResponse.json({ error: "Crafter id not found :/" });
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

// export async function PATCH(request: NextRequest) {
//       try {
//         const data: post = await request.json();
//         console.log(data);

//         const { id, ...updateimage } = data;
//         const dataDocumentReference = doc(db, 'images', id);
//         const existingDataSnapshot = await getDoc(dataDocumentReference);

//         if (existingDataSnapshot.exists()){
//           await updateDoc(dataDocumentReference, { updateimage });
//           return NextResponse.json({ message: 'Image updated successfully' });

//         } else {
//           return NextResponse.json({message : 'Image Not Found'})
//         }
//       } catch (error) {
//         console.error('Error updating image:', error);
//         return NextResponse.json({ error: 'Internal Server Error' });
//       }
//   }
