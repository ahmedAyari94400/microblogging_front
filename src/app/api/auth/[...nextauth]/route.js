// src/app/api/auth/[...nextauth]/route.js (App Router)
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        firstname: { label: "Prénom", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        console.log(
          "🔍 NextAuth v4 - Authorize appelé avec:",
          credentials?.firstname
        );
        try {
          // Appel au back API Express pour vérifier les credentials
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstname: credentials.firstname,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();
          console.log("🔍 Réponse du backend:", response.status, data);

          if (response.ok && data.user) {
            // Retourne l'objet user qui sera stocké dans le token et visible dans la page dashboard
            return {
              id: data.user.id,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              email: data.user.email,
              // ajouter d'autres champs (photo)
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
      console.log("🔍 JWT callback - user:", user, "token:", token);
      if (user) {
        token.id = user.id;
        token.firstname = user.firstname;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Envoie les propriétés vers le client
      session.user.id = token.id;
      session.user.firstname = token.firstname;
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

// code pour DEBUG
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         firstName: { label: "Prénom", type: "text" },
//         password: { label: "Mot de passe", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log(
//           "🔍 NextAuth v4 - Authorize appelé avec:",
//           credentials?.firstName
//         );

//         // Test simple sans appel backend pour débugger
//         if (
//           credentials?.firstName === "test" &&
//           credentials?.password === "test"
//         ) {
//           console.log("✅ Test user connecté");
//           return {
//             id: "1",
//             firstName: "Test User",
//             email: "test@test.com",
//           };
//         }

//         console.log("❌ Échec de connexion");
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("🔍 JWT callback - user:", user, "token:", token);
//       if (user) {
//         token.id = user.id;
//         token.firstName = user.firstName;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("🔍 Session callback - token:", token);
//       session.user.id = token.id;
//       session.user.firstName = token.firstName;
//       session.user.email = token.email;
//       return session;
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true, // Active les logs de debug
// });

// export { handler as GET, handler as POST };
