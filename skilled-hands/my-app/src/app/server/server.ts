"use server"

import { auth } from "@clerk/nextjs";
import axios from "axios";

export const verifyCrafter = async (userId: string) => {
  try {
    const response = await axios.get(
      `${process.env.PORT_URL}/api/crafter/verify?id=${userId}`
    );
    const crafterId = response.data.crafterId;
    return crafterId;
  } catch (error) {
    console.log(error);
  }
};

export const verifyUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${process.env.PORT_URL}/api/user/verify?id=${userId}`
    );
    return response.data.userId;
  } catch (error) {
    console.log(error);
  }
};

