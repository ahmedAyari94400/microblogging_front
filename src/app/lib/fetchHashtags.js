export const fetchHashtags = async () => {
  const response = await fetch('http://localhost:3001/hashtags');
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des hashtags');
  }
  return response.json();
};