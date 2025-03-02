import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  export function NewDialog({ 
    children, 
    title, 
    trigger, 
    description,
    open,
    onOpenChange 
  }: { 
    children: React.ReactNode
    title: string
    trigger: React.ReactNode
    description?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
            </DialogHeader>
            {children}
        </DialogContent>
        </Dialog>
    )
  }