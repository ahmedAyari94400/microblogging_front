'use client';

import { useEffect, useState } from "react";

export default function LikeButton({ postId }) {
  const MOCK_USER_ID = 1;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch le nombre de likes
        const resCount = await fetch(`http://localhost:3001/likes/count/${postId}`);
        if (!resCount.ok) throw new Error(`Erreur HTTP: ${resCount.status}`);
        const dataCount = await resCount.json();
        setLikeCount(dataCount.count || 0);

        // Vérifier si l'utilisateur a déjà liké
        const resCheck = await fetch(`http://localhost:3001/likes/check?userId=${MOCK_USER_ID}&postId=${postId}`);
        if (!resCheck.ok) throw new Error(`Erreur HTTP: ${resCheck.status}`);
        const dataCheck = await resCheck.json();
        setLiked(dataCheck.liked);

      } catch (error) {
        console.error("Erreur lors du fetch des likes :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [postId]);

  const handleLike = async () => {
    try {
      if (liked) {
        // Supprimer le like
        const res = await fetch(`http://localhost:3001/likes?userId=${MOCK_USER_ID}&postId=${postId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        setLikeCount((prev) => prev - 1);
      } else {
        // Ajouter un like
        const res = await fetch("http://localhost:3001/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: MOCK_USER_ID, post_id: postId }),
        });
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        setLikeCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Erreur lors du like/unlike :", error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <button
      onClick={handleLike}
      style={{ border: "none", background: "none", cursor: "pointer" }}
      aria-label={liked ? "Unlike" : "Like"}
    >
      <span style={{ fontSize: "24px", color: liked ? "red" : "gray" }}>
        {liked ? "❤️" : "🤍"}
      </span>
      <span style={{ marginLeft: "8px", fontSize: "16px" }}>{likeCount}</span>
    </button>
  );
}
