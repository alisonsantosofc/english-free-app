import { Checkbox } from '@/src/components/ui/checkbox';
import { Label } from '@/src/components/ui/label';
import { cn } from '@/src/lib/utils';
import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  labelText?: string;
  checkedLabelText?: string;
  onClick?: () => void;
	className?: string;
	disabled?: boolean;
}

function CustomCheckbox({ checked, labelText, checkedLabelText, disabled, onClick, className }: CustomCheckboxProps) {
	return (
		<div className={cn('w-fit flex items-start justify-center gap-2', className ? className : '')}>
			<Checkbox disabled={disabled} id="checkbox" className='[&[data-state=checked]]:bg-blue-800 [&[data-state=checked]]:border-blue-800 [&[data-state=checked]]:text-white' checked={checked} onClick={() => onClick && onClick() } />
			{labelText && <Label htmlFor="checkbox" className="leading-[16px]">{(checkedLabelText && checked) ? checkedLabelText : labelText}</Label>}
		</div>
	);
}

export default CustomCheckbox;