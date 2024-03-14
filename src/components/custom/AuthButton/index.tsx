'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Login = () => {
	return (
		<button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
		</button>
	);
};

const Register = () => {
	return (
		<Link href="/register" style={{ marginRight: 10 }}>
      Register
		</Link>
	);
};

const Logout = () => {
	return (
		<button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
		</button>
	);
};

const Profile = () => {
	return <Link href="/profile">Profile</Link>;
};

export const AuthButton = {
	Register: Register,
	Login: Login,
	Logout: Logout,
	Profile: Profile,
};