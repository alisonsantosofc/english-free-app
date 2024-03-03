'use client';

import { GraduationCap } from 'lucide-react';

import { Heading } from '@/components/custom/Heading';

const CertifiedPage = () => {
	return (
		<section>
			<Heading 
				title="Certificado de inglês"
				description="Descubra seu nível de inglês e obtenha um certificado de inglês reconhecido."
				icon={GraduationCap}
				bgColor="bg-gray-600"
			/>
			<div className="px-4 lg:px-8">
				<div className="space-y-4 mt-4">
				</div>
			</div>
		</section>
	);
};

export default CertifiedPage;