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
  import { deleteModelHelper, deleteAssetFromModelHelper } from "@/server/db/dbHelper"
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
              This action cannot be undone. This will permanently delete your model and any assets associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={async () => {
              await deleteAssetFromModelHelper(id);
              toast.success("Assets deleted successfully");
              await deleteModelHelper(id);
              toast.success("Model deleted successfully");
              // Refresh the table data
              router.refresh();
              
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
