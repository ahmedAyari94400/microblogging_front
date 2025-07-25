'use client';

import { useEffect, useState } from "react";

export default function LikeButton({ postId }) {
    const MOCK_USER_ID = 1;

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {

        fetch(`http://localhost:3001/likes/count/${postId}`)
            .then((res) => res.json())
            .then((data) => setLikeCount(data.count || 0))
            .catch((err) => console.error("Erreur fetch count:", err));

        // Vérifier si l'utilisateur a déjà liké le post
        fetch(`http://localhost:3001/likes/check?userId=${MOCK_USER_ID}&postId=${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setLiked(data.liked);
            })
            .catch((err) => console.error("Erreur fetch check:", err));
    }, [postId]);

    const handleLike = async () => {
        try {
            if (liked) {
                // Supprimer le like
                await fetch(`http://localhost:3001/likes?userId=${MOCK_USER_ID}&postId=${postId}`, {
                    method: "DELETE",
                });
                setLikeCount((prev) => prev - 1);
            } else {
                // Ajouter un like
                await fetch("http://localhost:3001/likes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: MOCK_USER_ID, post_id: postId }),
                });
                setLikeCount((prev) => prev + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error("Erreur lors du like/unlike :", error);
        }
    };

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
