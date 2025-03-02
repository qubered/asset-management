"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { locations, type models } from "@/server/db/schema"

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
import { createAssetHelper } from "@/server/db/dbHelper"
import { toast } from "sonner"
import { Check } from "lucide-react"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
const formSchema = z.object({
  assetName: z.string().min(2, {
    message: "Asset name must be at least 2 characters.",
  }),
  assetLocation: z.string().min(1, {
    message: "Asset location must be selected.",
  }),
  assetCategory: z.string().min(2, {
    message: "Asset category must be at least 2 characters.",
  }),
  assetModel: z.number().min(1, {
    message: "Asset model must be selected.",
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
async function submitFormData(
  data: z.infer<typeof formSchema>, 
  locationsList: typeof locations.$inferSelect[],
  onSuccess?: () => void
) {
  try {
    const selectedLocation = locationsList.find(loc => loc.id.toString() === data.assetLocation);
    const mappedData = {
      name: data.assetName,
      location: selectedLocation?.name ?? "",
      category: data.assetCategory,
      modelId: data.assetModel
    };
    await createAssetHelper(mappedData);
    toast.success("Asset created successfully");
    
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    toast.error("Failed to create asset");
    console.error(error);
  }
}

interface NewAssetFormProps {
  onSuccess?: () => void;
  models: typeof models.$inferSelect[];
  locations: typeof locations.$inferSelect[];
}

export function NewAssetForm({ onSuccess, models, locations }: NewAssetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetName: "",
      assetLocation: "",
      assetCategory: "",
      assetModel: 0,
    },
  })

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    await submitFormData(data, locations, onSuccess);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="assetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Name</FormLabel>
              <FormControl>
                <Input placeholder="Asset Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="assetLocation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Location</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? (locations ?? []).find(
                            (location) => location.id.toString() === field.value
                          )?.name
                        : "Select location"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandList>
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup>
                        {(locations ?? []).map((location) => (
                          <CommandItem
                            value={location.name ?? `Location ${location.id}`}
                            key={location.id}
                            onSelect={() => {
                              form.setValue("assetLocation", location.id.toString())
                            }}
                          >
                            {location.name ?? `Location ${location.id}`}
                            <Check
                              className={cn(
                                "ml-auto",
                                location.id.toString() === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="assetCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Asset Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="assetModel"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Model</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? models.find(
                            (model) => model.id === field.value
                          )?.name
                        : "Select model"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search model..." />
                    <CommandList>
                      <CommandEmpty>No model found.</CommandEmpty>
                      <CommandGroup>
                        {models.map((model) => (
                          <CommandItem
                            value={model.name ?? `Model ${model.id}`}
                            key={model.id}
                            onSelect={() => {
                              form.setValue("assetModel", model.id)
                            }}
                          >
                            {model.name ?? `Model ${model.id}`}
                            <Check
                              className={cn(
                                "ml-auto",
                                model.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
