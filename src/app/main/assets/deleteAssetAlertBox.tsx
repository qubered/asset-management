import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { deleteAssetHelper } from "@/server/db/dbHelper"
  import { useRouter } from "next/navigation"
  import { toast } from "sonner"
  export function DeleteAlertBox({ id }: { id: number }) {
    const router = useRouter()
    
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span>Delete</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your asset
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={async () => {
              await deleteAssetHelper(id);
              // Refresh the table data
              router.refresh();
              toast.success("Asset deleted successfully");
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
