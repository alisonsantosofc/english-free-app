import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  labelText?: string;
  checkedLabelText?: string;
  onClick?: () => void;
	className?: string;
}

function CustomCheckbox({ checked, labelText, checkedLabelText, onClick, className }: CustomCheckboxProps) {
	return (
		<div className={cn('flex items-center justify-center gap-2', className ? className : '')}>
			<Checkbox className='[&[data-state=checked]]:bg-blue-800 [&[data-state=checked]]:border-blue-800 [&[data-state=checked]]:text-white' checked={checked} onClick={() => onClick && onClick() } />
			{labelText && <Label>{(checkedLabelText && checked) ? checkedLabelText : labelText}</Label>}
		</div>
	);
}

export default CustomCheckbox;