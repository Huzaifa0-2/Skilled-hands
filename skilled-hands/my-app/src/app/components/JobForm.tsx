"use client";
import { jobFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function JobForm({userId}:{userId: string}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues:{
      userId: userId
    }
  });

  async function onSubmit(values: z.infer<typeof jobFormSchema>) {
    toast.loading("Posting Job...");
    console.log(values);
    const response = await axios.post("/api/user/job", values);
    if (response.status === 200) {
      toast.dismiss();
      toast.success("Job posted successfully.");
      router.refresh();
    } else {
      toast.dismiss();
      toast.error("Error posting job.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="painter is required..."
                  {...field}
                  className="bg-inherit border-sky-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the job..."
                  className="bg-inherit border-sky-600 resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be the job description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location"
                  {...field}
                  className="bg-inherit border-sky-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-5">
          <FormField
            control={form.control}
            name="pay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pay</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Your budget"
                    {...field}
                    className="bg-inherit border-sky-600"
                  />
                </FormControl>
                <FormDescription>This will be your budget</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="03123456789"
                    {...field}
                    className="bg-inherit border-sky-600"
                    // onChange={(e) => {
                    //   field.onChange(parseInt(e.target.value, 10));
                    // }}
                  />
                </FormControl>
                <FormDescription>
                  This will be your public contact number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
