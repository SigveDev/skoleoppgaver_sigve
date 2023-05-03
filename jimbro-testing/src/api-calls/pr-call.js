export default async function fetchPr(id) {
    const response = await fetch('http://localhost:5000/pr/get/' + id, { withCredentials: true });
    const data = await response.json();
    return data;
}