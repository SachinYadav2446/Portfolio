const GITHUB_API = "https://api.github.com";
const DEFAULT_USERNAME = "SachinYadav2446";
export const dynamic = "force-dynamic";
function githubHeaders() {
  const headers = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}
function kindFor(message) {
  const text = message.toLowerCase();
  if (/fix|bug|patch|repair|hotfix/.test(text)) return "fix";
  if (/ci|deploy|build|release|workflow|test/.test(text)) return "ci";
  if (/merge/.test(text)) return "merge";
  if (/feat|add|create|implement/.test(text)) return "feature";
  return "commit";
}
export async function GET() {
  const username = process.env.GITHUB_USERNAME || DEFAULT_USERNAME;
  try {
    const reposResponse = await fetch(`${GITHUB_API}/users/${username}/repos?sort=updated&direction=desc&per_page=12`, { headers: githubHeaders(), cache: "no-store" });
    if (!reposResponse.ok) throw new Error("Repositories unavailable");
    const repositories = (await reposResponse.json()).filter((repo) => !repo.fork).slice(0, 5);
    const results = await Promise.all(repositories.map(async (repository) => {
      const response = await fetch(`${GITHUB_API}/repos/${username}/${repository.name}/commits?per_page=8`, { headers: githubHeaders(), cache: "no-store" });
      return response.ok ? { repository, commits: await response.json() } : { repository, commits: [] };
    }));
    const commits = results.flatMap(({ repository, commits: repoCommits }) => repoCommits.map((commit) => ({
      sha: commit.sha.slice(0, 7),
      message: commit.commit.message.split("\n")[0],
      date: commit.commit.author?.date || commit.commit.committer?.date,
      repository: repository.name,
      url: commit.html_url,
      kind: kindFor(commit.commit.message),
    }))).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-18);
    return Response.json({ commits, fetchedAt: new Date().toISOString() }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
  } catch {
    return Response.json({ error: "Timeline unavailable" }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}