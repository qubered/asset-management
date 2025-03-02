import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  export function NewDialog( { children, title, trigger }: { children: React.ReactNode, title: string, trigger: React.ReactNode }) {
    return (
        <Dialog>
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                {children}
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
  }