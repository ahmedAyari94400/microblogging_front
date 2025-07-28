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
        console.log("🔍 NextAuth - Credentials reçues:", credentials);
        console.log("🔍 Backend URL:", process.env.BACKEND_URL);

        try {
          const url = `${process.env.BACKEND_URL}/api/auth/login`;
          console.log("🔍 URL complète:", url);

          const payload = {
            firstname: credentials.firstname,
            password: credentials.password,
          };
          console.log("🔍 Payload envoyé:", payload);

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          console.log("🔍 Status response:", response.status);
          console.log(
            "🔍 Response headers:",
            Object.fromEntries(response.headers)
          );

          // Récupérer le texte brut d'abord
          const responseText = await response.text();
          console.log(
            "🔍 Response brute (100 premiers chars):",
            responseText.substring(0, 100)
          );

          // Essayer de parser en JSON
          let data;
          try {
            data = JSON.parse(responseText);
            console.log("🔍 Data parsée:", data);
          } catch (parseError) {
            console.error("🔍 Erreur parsing JSON:", parseError);
            console.log("🔍 Contenu complet:", responseText);
            return null;
          }

          if (response.ok && data.user) {
            return {
              id: data.user.id,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              email: data.user.email,
            };
          } else {
            console.log(
              "🔍 Échec authentification - response.ok:",
              response.ok,
              "data.user:",
              data.user
            );
            return null;
          }
        } catch (error) {
          console.error("🔍 Erreur complète:", error);
          return null;
        }
      },
      async authorize(credentials) {
        console.log("🔍 NextAuth - Credentials reçues:", credentials);
        console.log("🔍 Backend URL:", process.env.BACKEND_URL);

        try {
          const url = `${process.env.BACKEND_URL}/auth/login`;
          console.log("🔍 URL complète:", url);

          const payload = {
            firstname: credentials.firstname,
            password: credentials.password,
          };
          console.log("🔍 Payload envoyé:", payload);

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          console.log("🔍 Status response:", response.status);
          console.log(
            "🔍 Response headers:",
            Object.fromEntries(response.headers)
          );

          // Récupérer le texte brut d'abord
          const responseText = await response.text();
          console.log(
            "🔍 Response brute (100 premiers chars):",
            responseText.substring(0, 100)
          );

          // Essayer de parser en JSON
          let data;
          try {
            data = JSON.parse(responseText);
            console.log("🔍 Data parsée:", data);
          } catch (parseError) {
            console.error("🔍 Erreur parsing JSON:", parseError);
            console.log("🔍 Contenu complet:", responseText);
            return null;
          }

          if (response.ok && data.user) {
            return {
              id: data.user.id,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              email: data.user.email,
            };
          } else {
            console.log(
              "🔍 Échec authentification - response.ok:",
              response.ok,
              "data.user:",
              data.user
            );
            return null;
          }
        } catch (error) {
          console.error("🔍 Erreur complète:", error);
          return null;
        }
      },
      // async authorize(credentials) {
      //   console.log(
      //     "🔍 NextAuth v4 - Authorize appelé avec:",
      //     credentials?.firstname
      //   );
      //   try {
      //     // Appel au back API Express pour vérifier les credentials
      //     const response = await fetch(
      //       `${process.env.BACKEND_URL}/api/auth/login`,
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           firstname: credentials.firstname,
      //           password: credentials.password,
      //         }),
      //       }
      //     );

      //     const data = await response.json();
      //     console.log("🔍 Réponse du backend:", response.status, data);

      //     if (response.ok && data.user) {
      //       // Retourne l'objet user qui sera stocké dans le token et visible dans la page dashboard
      //       return {
      //         id: data.user.id,
      //         firstname: data.user.firstname,
      //         lastname: data.user.lastname,
      //         email: data.user.email,
      //         // ajouter d'autres champs (photo)
      //       };
      //     } else {
      //       // Credentials invalides
      //       return null;
      //     }
      //   } catch (error) {
      //     console.error("Erreur lors de l'authentification:", error);
      //     return null;
      //   }
      // },
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
