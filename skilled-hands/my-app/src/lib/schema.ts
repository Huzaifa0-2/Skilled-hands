import * as z from "zod";

export const jobFormSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, { message: "Title is required" }),
  desc: z.string().min(2, { message: "Description is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  contact: z.coerce.number().min(11).gt(0, { message: "Invalid contact" }),
  pay: z.coerce.number().min(2, { message: "Pay is required" }),
});

export const proposalFormSchema = z.object({
  proposal: z.string().min(5),
})