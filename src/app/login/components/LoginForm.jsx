"use client";

import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    password: "",
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
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Vous êtes connecté");
        setFormData({
          firstname: "",
          password: "",
        });
      } else {
        setMessage(data.error || data.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      setMessage("Erreur réseau ou serveur");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 p-4 shadow-md rounded"
      style={{ backgroundColor: "var(--vert)" }}
    >
      <h2 className="text-xl font-bold">Se connecter</h2>

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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Se connecter
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
