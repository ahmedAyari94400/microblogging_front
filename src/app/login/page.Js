import LoginForm from "./components/LoginForm";
import Link from "next/link";
import ButtonLink from "../components/ButtonLink";

export default function LoginPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center mt-20 mb-6">
          Je me connecte
        </h1>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-2">
        <LoginForm />
        <p className="text-4xl text-center mt-15 p-6">
          Pas encore de compte ?<br></br>
          <br></br>
          Créez le vôtre en quelques clics<br></br>et commencez à partager avec
          la communauté !
        </p>
        {/* Bouton */}
        <ButtonLink href="signup">Créer un compte</ButtonLink>
        {/* <div className="hidden md:flex center">
          <Link
            href="/signup"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-sm transition"
          >
            Créer un compte
          </Link>
        </div> */}
      </div>
    </>
  );
}
