"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { Crafter} from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

const formSchema = z.object({
    id: z.string().min(2).max(50),
    name: z.string().min(3),
    bio: z.string().min(5),
    domain: z.string().min(3).max(25),
    location: z.string().max(50),
    contact: z.string().min(11),
});

export function ProfileForm({initialProfileData, update}:{initialProfileData: Crafter, update:boolean}) {
  const {userId} = useAuth();
  const {name, location, contact, bio, domain} = initialProfileData;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userId!,
      name: name,
      bio: bio,
      domain: domain,
      contact: contact,
      location: location,
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(update){
      const response = await axios.patch("/api/crafter/profile",values);
      toast.success("Profile Updated Successfully!");
    } else {
      const response = await axios.post("/api/crafter/profile", values);
      toast.success("Profile Created Successfully!");
    }
  }

  return (
    <div className="px-20 py-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
      control={form.control}
      name="domain"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Domain</FormLabel>
          <FormControl>
            <Input placeholder="enter your domain" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Enter your bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input placeholder="enter your contact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{update?'Update':'Submit'}</Button>
      </form>
    </Form>
    </div>
  )
}