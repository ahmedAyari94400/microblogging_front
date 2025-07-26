// src/app/api/auth/[...nextauth]/route.js (App Router)

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        firstName: { label: "Prénom", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Appel à votre API Express pour vérifier les credentials
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: credentials.firstName,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.user) {
            // Retourne l'objet user qui sera stocké dans le token
            return {
              id: data.user.id,
              firstName: data.user.firstName,
              email: data.user.email,
              // autres champs selon vos besoins
            };
          } else {
            // Credentials invalides
            return null;
          }
        } catch (error) {
          console.error("Erreur lors de l'authentification:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persiste les données user dans le token JWT
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Envoie les propriétés vers le client
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/login", // page de login
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
