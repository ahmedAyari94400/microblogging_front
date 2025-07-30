"use client";

import { useState } from "react";

export default function PostForm({ userId }) {
  const [description, setDescription] = useState("");
  const [urlPictures, setUrlPictures] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      description,
      url_pictures: urlPictures,
      user_id: userId,
      hashtag,
    };

    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la création du post.");
      }

      const newPost = await res.json();
      console.log("Post créé :", newPost);
      setMessage("Post créé avec succès 🎉");
      // Réinitialiser les champs
      setDescription("");
      setUrlPictures("");
      setHashtag("");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la création du post.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          value={urlPictures}
          onChange={(e) => setUrlPictures(e.target.value)}
          placeholder="URL image"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="#exemple #voyage"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Publier
        </button>
      </form>
      {/* Affichage du message de succès */}
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </>
  );
}
