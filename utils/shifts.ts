import { Shift } from '@/types/shift';

export function isOverlapping(shift1: Shift, shift2: Shift): boolean {
  if (shift1.date !== shift2.date) return false;
  
  const [start1, end1] = shift1.startTime.split(':').map(Number);
  const [start2, end2] = shift2.startTime.split(':').map(Number);
  
  const startTime1 = start1 * 60;
  const endTime1 = end1 * 60;
  const startTime2 = start2 * 60;
  const endTime2 = end2 * 60;
  
  return (startTime1 < endTime2 && endTime1 > startTime2);
}

export function isShiftStarted(shift: Shift): boolean {
  const now = new Date();
  const [hours, minutes] = shift.startTime.split(':').map(Number);
  const shiftDate = new Date(shift.date);
  shiftDate.setHours(hours, minutes);
  
  return now > shiftDate;
}