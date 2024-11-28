import { getReleaseInfo } from '@/service/getReleaseInfo';
import { useQuery } from '@tanstack/react-query'
import { TotalDownloads } from '../charts/total-downloads';

interface RepoProps {
  owner: string;
  repo: string;
}

const fiveMinutes = 1000 * 60 * 5

const errorMessage = 'Repository not found or doesn\'t have any releases'

export function Repo({ owner, repo }: RepoProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['get-releases-info', owner, repo],
    queryFn: () => getReleaseInfo(owner, repo),
    staleTime: fiveMinutes,
    gcTime: fiveMinutes,
  })

  if (isLoading) return <div>Loading...</div>
  if (!data || 'message' in data || data.length === 0) return <div>{errorMessage}</div>

  return (
    <div>
      <div className='flex gap-2'>
        <TotalDownloads releases={data} />
      </div>
    </div>
  )
}
