import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useLocalStorage } from "@uidotdev/usehooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  owner: z.string().min(1, "Owner é obrigatório"),
  repo: z.string().min(1, "Repository é obrigatório"),
})

interface AddRepositoryDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export type Repository = z.infer<typeof formSchema>

export function AddRepositoryDialog({ open, setOpen }: AddRepositoryDialogProps) {
  const [repositories, setRepositories] = useLocalStorage<Repository[] | null>("repositories", null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      owner: "",
      repo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setRepositories([...(repositories ?? []), values])
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Repository</DialogTitle>
          <DialogDescription>
            Add a repository to your project.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner</FormLabel>
                  <FormControl>
                    <Input placeholder="github-owner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository</FormLabel>
                  <FormControl>
                    <Input placeholder="repository-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Add Repository</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}