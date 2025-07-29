"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  console.log("📊 URL image:", session?.user?.url_userpicture);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mt-8 mb-10">
        Mon tableau de bord
      </h1>
      <div className="flex flex-col px-10">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={session?.user?.url_userpicture}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-xl font-semibold mb-2">
              Bonjour {session?.user?.firstname} {session?.user?.lastname}
            </p>
            <p className="text-gray-600">Email : {session?.user?.email}</p>
          </div>

          <div>
            <p className="font-bold text-xl mt-10">
              Mes posts {session?.posts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
