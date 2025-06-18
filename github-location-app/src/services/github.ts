// Validates GitHub username by checking if profile exists (status 200).
export async function validateGithubUser(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    return res.status === 200;
  } catch {
    return false;
  }
}
