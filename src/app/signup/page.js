"use client";

// import React, { useEffect, useState } from 'react';

import RegisterForm from "./components/RegisterForm";

export default function SignupPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-center mt-15 mb-20">
          Je crée mon compte
        </h1>
      </div>

      <div className="min-h-screen">
        {/* <h1>Je crée mon compte</h1> */}
        <RegisterForm />
      </div>
    </>
  );
}
