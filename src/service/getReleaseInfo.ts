import { NotFound, Releases } from "@/types/release"

export async function getReleaseInfo(owner: string, repo: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases`

  const response = await fetch(url)
  const data = await response.json() as Releases | NotFound | []
  
  return data
}
