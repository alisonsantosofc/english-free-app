'use client';

import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

import { TRequestStatus } from '@/src/@types/IRequest';

interface SessionsProviderProps {
  children: ReactNode;
}

interface RegisterUserProps {
	name: string;
	email: string;
	password: string;
}

interface SessionsContextData {
	registerUser: (data: RegisterUserProps) => Promise<void>;
	registerUserReqStatus: TRequestStatus;
	registerUserReqCode: string;
}

const SessionsContext = createContext<SessionsContextData>(
  {} as SessionsContextData
);

export function SessionsProvider({ children }: SessionsProviderProps) {
	const [registerUserReqStatus, setRegisterUserReqStatus] = useState<TRequestStatus>('idle');
	const [registerUserReqCode, setRegisterUserReqCode] = useState<string>('');

	async function registerUser({ name, email, password }:RegisterUserProps) {
		try {
			setRegisterUserReqStatus('loading');

			const response = await axios.post('/api/register', {
				name,
				email,
				password,
			});
			
			setRegisterUserReqStatus('succeeded');

			setTimeout(() => {
				setRegisterUserReqStatus('idle');
			}, 500);
		} catch (error: any) {
			setRegisterUserReqCode(error.response.data.code);
			setRegisterUserReqStatus('failed');
		}
	};

	return (
		<SessionsContext.Provider value={{ registerUser, registerUserReqStatus, registerUserReqCode }}>
			{children}
		</SessionsContext.Provider>
	);
}

export function useSessions() {
	const context = useContext(SessionsContext);

	return context;
}
