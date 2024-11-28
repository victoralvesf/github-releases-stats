import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useLocalStorage } from "@uidotdev/usehooks"
import { FolderGit2, Plus } from "lucide-react";
import { AddRepositoryDialog, Repository } from "../dialogs/add-repository";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function AppSidebar() {
  const [repositories] = useLocalStorage<Repository[] | null>("repositories", null);
  const [open, setOpen] = useState(false);

  const hasRepositories = repositories !== null && repositories.length > 0;

  const repositoryList = repositories?.map((repository) => (
    <SidebarMenuItem key={`${repository.owner}/${repository.repo}`}>
      <SidebarMenuButton asChild>
        <Link to="/repository/$owner/$repo" params={{ owner: repository.owner, repo: repository.repo }}>
          <FolderGit2 className="w-4 h-4 mr-1" />
          <span>{repository.repo}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));

  return (
    <>
      <AddRepositoryDialog open={open} setOpen={setOpen} />
      
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Repositories</SidebarGroupLabel>
            <SidebarGroupAction title="Add Project" onClick={() => setOpen(true)}>
              <Plus /> <span className="sr-only">Add Repository</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {hasRepositories ? repositoryList : <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    No repositories
                  </SidebarMenuButton>
                </SidebarMenuItem>}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}
