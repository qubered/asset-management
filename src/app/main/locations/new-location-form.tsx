"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { locations } from "@/server/db/schema"

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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { createLocationHelper, createModelHelper } from "@/server/db/dbHelper"
import { toast } from "sonner"
import { Check } from "lucide-react"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  locationName: z.string().min(2, {
    message: "Location name must be at least 2 characters.",
  }),
})

const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const

// Create a function that will be used in the component
async function submitFormData(data: z.infer<typeof formSchema>, onSuccess?: () => void) {
  try {
    const mappedData = {
      name: data.locationName,
    };
    await createLocationHelper(mappedData);
    toast.success("Location created successfully");
    
    // Call onSuccess callback if provided
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    toast.error("Failed to create location");
    console.error(error);
  }
}

interface NewLocationFormProps {
  onSuccess?: () => void;
  locations?: typeof locations.$inferSelect[];
}

export function NewLocationForm({ onSuccess }: NewLocationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationName: "",
    },
  })

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    await submitFormData(data, onSuccess);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="locationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Location Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
