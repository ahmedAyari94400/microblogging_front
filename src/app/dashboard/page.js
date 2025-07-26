"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <p>
        Vous êtes connecté en tant que :{" "}
        <strong>{session?.user?.firstName}</strong>
      </p>
      <p>Email : {session?.user?.email}</p>
    </div>
  );
}
