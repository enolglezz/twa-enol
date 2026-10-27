export async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('El archivo respondido no es un JSON válido');
  }
  return await res.json();
}