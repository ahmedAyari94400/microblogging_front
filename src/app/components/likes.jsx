'use client';

import { useState, useEffect } from 'react';

export default function LikeButton({ postId, userId }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeId, setLikeId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger likeCount et vérifier si l'utilisateur a liké ce post
  useEffect(() => {
    async function fetchLikes() {
      setLoading(true);
      try {
        // Récupère le nombre total de likes pour le post
        const countRes = await fetch(`http://localhost:3001/likes/count/${postId}`);
        const countData = await countRes.json();
        setLikeCount(countData.count || 0);

        // Récupère les likes du user sur ce post (0 ou 1 like)
        const userLikesRes = await fetch(
          `http://localhost:3001/likes?post_id=${postId}&user_id=${userId}`
        );
        const userLikes = await userLikesRes.json();

        if (userLikes.length > 0) {
          setLiked(true);
          setLikeId(userLikes[0].id);
        } else {
          setLiked(false);
          setLikeId(null);
        }
      } catch (error) {
        console.error("Erreur fetch likes :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLikes();
  }, [postId, userId]);

  const handleLike = async () => {
    try {
      if (!liked) {
        // Créer le like (POST)
        const response = await fetch('http://localhost:3001/likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, post_id: postId }),
        });

        if (response.ok) {
          const newLike = await response.json();
          setLikeCount((count) => count + 1);
          setLiked(true);
          setLikeId(newLike.id);
        } else {
          const errorData = await response.json();
          console.error('Erreur lors de la création du like:', errorData);
        }
      } else {
        // Supprimer le like (DELETE)
        const response = await fetch(`http://localhost:3001/likes/${likeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setLikeCount((count) => count - 1);
          setLiked(false);
          setLikeId(null);
        } else {
          console.error('Erreur lors de la suppression du like');
        }
      }
    } catch (error) {
      console.error('Erreur réseau ou autre:', error);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <button
      onClick={handleLike}
      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
      aria-label={liked ? 'Retirer le like' : 'Liker'}
    >
      <span style={{ fontSize: '24px', color: liked ? 'red' : 'gray' }}>
        {liked ? '❤️' : '🤍'}
      </span>
      <span style={{ marginLeft: '8px', fontSize: '16px' }}>{likeCount}</span>
    </button>
  );
}
