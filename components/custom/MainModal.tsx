'use client';

import { useMainModal } from '@/hooks/useMainModal';
import ReactModal from 'react-modal';
import { Card } from '../ui/card';
import { X } from 'lucide-react';

function MainModal() {
	const { mainModal, setMainModal } = useMainModal();

	return (
		<ReactModal 
			isOpen={mainModal ? true : false} 
			onRequestClose={() => setMainModal(null)}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
			ariaHideApp={false}
		>
			<Card className="relative p-6 w-100vw md:w-fit">
				{mainModal}
				<X 
					className="h-5 w-5 absolute top-2 right-2 cursor-pointer" 
					onClick={() => setMainModal(null)}
				/>
			</Card>
		</ReactModal>
	);
}

export default MainModal;