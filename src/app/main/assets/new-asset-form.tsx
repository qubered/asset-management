"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { GetCategories, GetModels, GetLocations, GetID } from "@/server/convex/dbHelper";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";


const formSchema = z.object({
  assetTag: z.string(),
  name: z.optional(z.string()),
  serielNumber: z.optional(z.string()),
  model: z.custom<Id<"models">>(),
  category: z.custom<Id<"categories">>(),
  currentLocation: z.custom<Id<"locations">>(),
  defaultLocation: z.custom<Id<"locations">>(),
  notes: z.optional(z.string()),
  ownerID: z.string(),
})

export function AssetForm() {
  const categories = GetCategories();
  const models = GetModels();
  const locations = GetLocations();
  const currentID = GetID();

  const createAsset = useMutation(api.assets.create);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetTag: "",
      name: "",
      serielNumber: "",
      model: "",
      category: "",
      currentLocation: "",
      defaultLocation: "",
      notes: "",
      ownerID: currentID ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createAsset({
        assetTag: values.assetTag,
        name: values.name ?? "",
        serielNumber: values.serielNumber ?? "",
        model: values.model,
        category: values.category,
        currentLocation: values.currentLocation,
        defaultLocation: values.defaultLocation,
        ownerID: currentID ?? "",
      });
      toast.success("Asset created successfully");
    } catch (error) {
      toast.error("Failed to create asset");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="assetTag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Tag</FormLabel>
              <FormControl>
                <Input placeholder="Asset Tag" {...field} />
              </FormControl>
              <FormDescription>
                Asset tag is a unique identifier for the asset.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Name is the name of the asset.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {models?.map((model) => (
                    <SelectItem key={model._id} value={model._id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Name is the name of the asset.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a current location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations?.map((location) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Name is the name of the asset.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a default location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations?.map((location) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Name is the name of the asset.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}