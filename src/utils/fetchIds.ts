export async function fetchIds(endpoint: string) {
  const response = await fetch(`https://api.flyff.com/${endpoint}`);
  const data: number[] = await response.json();
  return data;
}
