"use client";
import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonSubmit from "../../components/ButtonSubmit";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        firstname: formData.firstname,
        password: formData.password,
        redirect: false, // On gère la redirection manuellement
      });

      if (result?.error) {
        setError("Identifiants invalides");
      } else {
        // Connexion réussie
        const session = await getSession();
        console.log("Session créée:", session);

        // Redirection vers la page souhaitée
        router.push("/dashboard"); // ou la page de votre choix
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="firstname" className="block text-sm font-medium">
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          disabled={isLoading}
        />
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* <button
        type="submit"
        disabled={isLoading}
        className="w-auto mx-auto block bg-blue-600 text-xl text-white font-bold py-6 px-8 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button> */}

      <ButtonSubmit>Se connecter</ButtonSubmit>
    </form>
  );
};

export default LoginForm;
