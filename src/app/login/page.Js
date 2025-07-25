import LoginForm from "./components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-center mt-15 mb-20">
          Je me connecte
        </h1>
      </div>

      <div className="min-h-screen">
        <LoginForm />
        <p className="text-xl text-center mt-15">
          Pas encore de compte ?<br></br>
          Créez votre compte en quelques clics !
        </p>
        {/* Bouton */}
        <div className="hidden md:flex center">
          <Link
            href="/signup"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-sm transition"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </>
  );
}
