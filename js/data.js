export default async function fetchWorksData() {
  const response = await fetch("http://localhost:5678/api/works");

  if (response.status >= 400) {
    console.error("An error occurred while trying to fetch data");
    return null;
  }

  const worksData = await response.json();
  return worksData;
}
