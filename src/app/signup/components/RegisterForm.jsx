"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    user_biography: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Compte créé avec succès 🎉");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          user_biography: "",
        });
      } else {
        setMessage(data.message || "Erreur lors de la création du compte");
      }
    } catch (error) {
      setMessage("Erreur réseau ou serveur");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-bold">Créer un compte</h2>

      <input
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        placeholder="Prénom"
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        placeholder="Nom"
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Mot de passe"
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="user_biography"
        value={formData.user_biography}
        onChange={handleChange}
        placeholder="Quelques mots sur moi"
        rows="4"
        className="w-full border p-2 rounded"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        S’inscrire
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
