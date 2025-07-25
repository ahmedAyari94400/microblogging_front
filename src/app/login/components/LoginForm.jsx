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
      className="w-full max-w-2xl mx-auto space-y-6 p-8 shadow-lg rounded-xl"
      style={{ backgroundColor: "var(--bleugris)" }}
    >
      <h2 className="text-2xl font-bold text-center">Se connecter</h2>

      <div>
        <label
          htmlFor="firstname"
          className="block text-md font-medium text-gray-700 mb-1"
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
          className="block text-md text-gray-700 font-medium mb-1"
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
        className="w-full font-bold text-xl bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Se connecter
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
