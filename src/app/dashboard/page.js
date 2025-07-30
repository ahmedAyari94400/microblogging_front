"use client";
import { useSession } from "next-auth/react";
import PostForm from "./components/PostForm";

export default function Dashboard() {
  const { data: session, status } = useSession();

  // Debug détaillé
  // console.log("📊 Status session:", status);
  // console.log("📊 Session complète:", session);
  // console.log("📊 User:", session?.user);
  // console.log("📊 URL image:", session?.user?.url_userpicture);
  // console.log("📊 Type URL:", typeof session?.user?.url_userpicture);

  if (status === "loading") {
    return <div className="text-lg font-bold">Chargement...</div>;
  }

  if (!session) {
    return (
      <div className="text-lg font-bold decoration-red-600">Non connecté</div>
    );
  }

  const user = session.user;
  const userId = user.id;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mt-8 mb-10">
        Mon tableau de bord
      </h1>

      {/* Section debug visible */}
      {/* <div className="bg-gray-100 p-4 mb-6 rounded">
        <h3 className="font-bold">Debug Info:</h3>
        <p>URL: {session?.user?.url_userpicture || "UNDEFINED"}</p>
        <p>URL Type: {typeof session?.user?.url_userpicture}</p>
        <p>URL Length: {session?.user?.url_userpicture?.length || 0}</p>
      </div> */}

      {/* INFOS USER */}
      <div className="flex flex-col px-10">
        <div className="bg-gray-100 flex items-center gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <img
              src={session?.user?.url_userpicture}
              alt={`Photo de ${session?.user?.firstname}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-emerald-600"
            />
          </div>

          <div className=" flex flex-col">
            <p className="text-xl font-semibold mb-2">
              Bonjour {session?.user?.firstname} {session?.user?.lastname}
            </p>
            <p className="text-gray-600">Email : {session?.user?.email}</p>
          </div>
        </div>
        <div>{session?.user?.user_biography}</div>

        {/* Posts de l'utilisateur */}
        <div className="mb-6">
          <h2>Mes posts ({user.posts?.length || 0})</h2>
          {user.posts && user.posts.length > 0 ? (
            <div className="space-y-4">
              {user.posts.map((post) => (
                <div key={post.id} className="border p-4 rounded">
                  <p>
                    <strong>Description:</strong>{" "}
                    {post.description || "Pas de description"}
                  </p>
                  {post.url_pictures && (
                    <img
                      src={post.url_pictures}
                      alt="Post"
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  <p>
                    <strong>Hashtag:</strong> {post.hashtag || "Aucun"}
                  </p>
                  <p>
                    <strong>Likes:</strong> {post.likes?.length || 0}
                  </p>
                  <p>
                    <strong>Commentaires:</strong> {post.comments?.length || 0}
                  </p>
                  <p>
                    <strong>Créé le:</strong>{" "}
                    {post.created_at
                      ? new Date(post.created_at).toLocaleDateString()
                      : "Date inconnue"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun post pour le moment</p>
          )}
        </div>

        {/* Likes de l'utilisateur */}
        <div className="mb-6">
          <h2>Mes likes ({user.likes?.length || 0})</h2>
          {user.likes && user.likes.length > 0 ? (
            <div className="space-y-2">
              {user.likes.map((like) => (
                <div key={like.id} className="border p-2 rounded">
                  <p>Post liké: {like.posts?.description || "Post supprimé"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun like pour le moment</p>
          )}
        </div>
      </div>

      {/* Créer un post */}
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Créer un nouveau post</h1>
        <PostForm userId={userId} />
      </div>
    </div>
  );
}

// "use client";
// import { useSession } from "next-auth/react";

// export default function Dashboard() {
//   const { data: session } = useSession();

//   // Debug détaillé
//   console.log("📊 Status session:", status);
//   console.log("📊 Session complète:", session);
//   console.log("📊 User:", session?.user);
//   console.log("📊 URL image:", session?.user?.url_userpicture);
//   console.log("📊 Type URL:", typeof session?.user?.url_userpicture);

//   if (status === "loading") {
//     return <div>Chargement...</div>;
//   }

//   if (!session) {
//     return <div>Non connecté</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-center mt-8 mb-10">
//         Mon tableau de bord
//       </h1>
//       <div className="flex flex-col px-10">
//         <div className="flex items-center gap-4 mb-6">
//           <img
//             src={session?.user?.url_userpicture}
//             className="w-16 h-16 rounded-full object-cover"
//           />
//         </div>
//         <div className="flex flex-col">
//           <div>
//             <p className="text-xl font-semibold mb-2">
//               Bonjour {session?.user?.firstname} {session?.user?.lastname}
//             </p>
//             <p className="text-gray-600">Email : {session?.user?.email}</p>
//           </div>

//           <div>
//             <p className="font-bold text-xl mt-10">
//               Mes posts {session?.posts}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
