import { writeFile } from 'node:fs/promises'

const res = await fetch(
  'https://api.github.com/repos/nodejs/node',
)

if (!res.ok) throw new Error(`HTTP ${res.status}`)

const repo = await res.json()

console.log(repo.name, repo.stargazers_count)

const data = {
  name: repo.name,
  stars: repo.stargazers_count,
  description: repo.description,
  url: repo.html_url,
}

await writeFile(
  'repo.json',
  JSON.stringify(data, null, 2),
)