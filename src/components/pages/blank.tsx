import { FolderXIcon } from "lucide-react";

export function BlankPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Welcome to Dashboard
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          To start viewing data, please select a repository from the sidebar.
        </p>
        <div className="text-muted-foreground">
          <FolderXIcon className="w-24 h-24 mx-auto mb-4" />
          <p className="text-sm">
            Choose a repository to view release statistics.
          </p>
        </div>
      </div>
    </div>
  )
}
