"use client";

import { signIn } from 'next-auth/react';
import { UserRoundPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SignInButton() {
  return (
    <Button
      variant="default"
      className="flex gap-2 bg-mainColor-500 hover:bg-mainColor-400"
      onClick={() => {
        signIn('google', {
          callbackUrl: "/dashboard"
        });
      }}
    >
      <span>Comece grátis agora</span>
      <UserRoundPlus className="w-5 h-5" />
    </Button>
  );
}
