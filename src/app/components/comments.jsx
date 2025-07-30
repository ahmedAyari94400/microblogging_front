"use client";
import { useState } from "react";

export default function Comments({ postId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    try {
      const res = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: trimmed,
          user_id: 1, // à remplacer par l’ID du user connecté
          post_id: postId,
        }),
      });

      if (!res.ok) {
        console.error("Erreur lors de l'ajout du commentaire");
        return;
      }

      const addedComment = await res.json();

      // On vérifie que l'id est bien présent (Prisma doit le fournir)
      if (!addedComment.id) {
        // fallback id temporaire
        addedComment.id = Date.now();
      }

      setComments((prev) => [...prev, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowComments((v) => !v)}
        className="text-blue-600 text-sm hover:underline"
      >
        {showComments ? "Masquer les commentaires" : "Afficher les commentaires"}
      </button>

      {showComments && (
        <div className="mt-2">
          <ul className="mb-3 space-y-1">
            {comments.map((com) => (
              <li key={com.id} className="text-gray-800 text-sm">
                {com.comment}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
