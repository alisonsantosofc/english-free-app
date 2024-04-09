import { LucideIcon } from 'lucide-react';

export interface ISchedule {
  id: number,
  months: number,
  description: string,
  tags: string[],
  icon: LucideIcon,
  weeks: number[][],
}