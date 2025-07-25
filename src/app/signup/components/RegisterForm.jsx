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
      const res = await fetch("http://localhost:3001/register", {
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
        setMessage(
          data.error || data.message || "Erreur lors de la création du compte"
        );
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

      <div>
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Prénom"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nom
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Nom"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label
          htmlFor="user_biography"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Bio
        </label>
        <textarea
          id="user_biography"
          name="user_biography"
          value={formData.user_biography}
          onChange={handleChange}
          placeholder="Quelques mots sur moi"
          rows="4"
          className="w-full border p-2 rounded"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full text-xl font-bold bg-blue-600 text-white p-4 rounded hover:bg-blue-700"
      >
        S'inscrire
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
