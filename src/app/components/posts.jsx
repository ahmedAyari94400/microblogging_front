"use client";
import React from "react";
import Comments from "./comments.jsx"; // Assure-toi que le chemin est bon

const Post = ({
  id,
  description,
  url_pictures,
  hashtag,
  created_at,
  likes = [],
  comments = []
}) => {
  return (
    <article className="bg-white shadow-md rounded-lg p-4 max-w-xl w-full mx-auto mb-6 border border-gray-200">
      {url_pictures && (
        <img
          src={url_pictures}
          alt="Photo de voyage"
          className="w-full h-auto rounded-md mb-4 object-cover"
        />
      )}

      <div>
        <p className="text-gray-800 text-base mb-2">
          {description || "Pas de description."}
        </p>

        {hashtag && (
          <p className="text-blue-500 font-semibold mb-2">#{hashtag}</p>
        )}

        <p className="text-sm text-gray-500 mb-2">
          <strong>Créé le :</strong>{" "}
          {new Date(created_at).toLocaleDateString()}
        </p>

        <div className="flex justify-between text-sm text-gray-700 mt-4 mb-4">
          <span>💬 {comments.length} commentaire(s)</span>
          <span>❤️ {likes.length} like(s)</span>
        </div>

        {/* ✅ Intégration des commentaires ici */}
        <Comments postId={id} initialComments={comments} />
      </div>
    </article>
  );
};

export default Post;
