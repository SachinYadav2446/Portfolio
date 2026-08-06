const GITHUB_API = "https://api.github.com";
const DEFAULT_USERNAME = "SachinYadav2446";

export const revalidate = 3600;

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || DEFAULT_USERNAME;
  const headers = githubHeaders();

  try {
    const [profileResponse, repositoriesResponse] = await Promise.all([
      fetch(`${GITHUB_API}/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`${GITHUB_API}/users/${username}/repos?sort=updated&direction=desc&per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!profileResponse.ok || !repositoriesResponse.ok) {
      throw new Error("GitHub data could not be loaded");
    }

    const profile = await profileResponse.json();
    const repositories = await repositoriesResponse.json();

    const publicRepositories = repositories
      .filter((repository) => !repository.fork)
      .sort((a, b) => {
        const scoreA = a.stargazers_count * 10 + a.forks_count * 3;
        const scoreB = b.stargazers_count * 10 + b.forks_count * 3;
        return scoreB - scoreA || new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 6)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description: repository.description,
        language: repository.language,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        updatedAt: repository.updated_at,
        url: repository.html_url,
        homepage: repository.homepage,
      }));

    return Response.json(
      {
        profile: {
          login: profile.login,
          name: profile.name,
          avatarUrl: profile.avatar_url,
          bio: profile.bio,
          url: profile.html_url,
          publicRepos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
        },
        repositories: publicRepositories,
        fetchedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    return Response.json(
      { error: "GitHub data is temporarily unavailable." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}