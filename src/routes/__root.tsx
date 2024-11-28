import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AppSidebar } from '@/components/layout/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full max-w-full min-h-screen overflow-x-hidden p-6">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
