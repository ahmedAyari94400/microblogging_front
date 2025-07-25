export const fetchPosts = async () => {
  const response = await fetch('http://localhost:3001/posts'); // adapte si besoin
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des posts');
  }
  return response.json();
};