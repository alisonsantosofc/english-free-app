"use client";

import { Nunito } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/custom/SignInButton";

import { cn } from "@/lib/utils";

const nunito = Nunito({ 
  weight: '900', 
  subsets: ["latin"], 
});

const LandingPage = () => {
  const route = useRouter();

  return (
    <div className="w-screen md:w-[1244px] mx-auto h-full p-4 md:p-8">
      <div className="pt-[20%] flex flex-col gap-4">
        <Link 
          href="/dashboard" 
          className="flex items-center pl-3 mb-8"
        >
          <div className="relative w-14 h-14 mr-4">
            <Image
              fill
              alt="logo"
              src="/images/icon.svg"
            />
          </div>
          <h1 className={cn("text-4xl font-bold", nunito.className)}>
            English Free
          </h1>
        </Link>
        <p className={cn("text-lg w-full md:text-4xl md:max-w-xl font-semibold ")}>
          Domine o inglês sem gastar um centavo e em pouco tempo!
        </p>
        <p className={cn("w-full md:max-w-xl")}>
          Uma plataforma pensada para quem deseja aprender inglês mais
          não pode gastar, aprenda rápido seguindo os cronogramas e economize tempo.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row md:flex-row mt-8">
          <SignInButton />
          <Button 
            className="flex gap-2"
            onClick={() => route.push("/dashboard")}
          >
            <span>Entrar na plataforma</span>
            <LogIn className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;