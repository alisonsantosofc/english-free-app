import Image from 'next/image';
import React from 'react';
import { cn } from '../lib/utils';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ 
	weight: '900', 
	subsets: ['latin'], 
});

export default function loading() {
	return (
		<div className="w-screen h-screen bg-background flex flex-col justify-center items-center ">
			<div className="flex gap-2 items-center">
				<div className="relative w-10 h-10 sm:w-14 sm:h-14 mr-4">
					<Image
						fill
						alt="logo"
						src="/images/icon.svg"
					/>
				</div>
				<h1 className={cn('text-xl sm:text-3xl lg:text-4xl font-bold', nunito.className)}>
        English Free
				</h1>
			</div>

			<div className='loader mt-4'></div>
		</div>
	);
}
