import { Repo } from '@/components/pages/repo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/repository/$owner/$repo')({
  component: RouteComponent,
})

function RouteComponent() {
  const { owner, repo } = Route.useParams()

  return <Repo owner={owner} repo={repo} />
}
