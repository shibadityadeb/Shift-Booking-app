import { create } from 'zustand';
import { Shift } from '../types/shift';
import { isOverlapping } from '../utils/shifts';

interface ShiftsState {
  shifts: Shift[];
  selectedCity: string | null;
  bookShift: (shiftId: string) => void;
  cancelShift: (shiftId: string) => void;
  setSelectedCity: (city: string | null) => void;
}

export const useShiftsStore = create<ShiftsState>((set, get) => ({
  shifts: [
    {
      id: '1',
      date: '2024-02-20',
      startTime: '12:00',
      endTime: '14:00',
      city: 'Helsinki',
      isBooked: true,
    },
    {
      id: '2',
      date: '2024-02-20',
      startTime: '13:00',
      endTime: '15:00',
      city: 'Helsinki',
      isBooked: false,
      isOverlapping: true,
    },
    {
      id: '3',
      date: '2024-02-20',
      startTime: '14:00',
      endTime: '16:00',
      city: 'Helsinki',
      isBooked: true,
    },
    {
      id: '4',
      date: '2024-02-20',
      startTime: '16:00',
      endTime: '18:00',
      city: 'Helsinki',
      isBooked: false,
    },
    // Add more sample shifts
  ],
  selectedCity: null,
  
  bookShift: (shiftId) =>
    set((state) => {
      const updatedShifts = state.shifts.map((shift) => {
        if (shift.id === shiftId) {
          return { ...shift, isBooked: true };
        }
        // Check for overlapping shifts and update their status
        if (!shift.isBooked) {
          const targetShift = state.shifts.find(s => s.id === shiftId);
          if (targetShift && isOverlapping(shift, targetShift)) {
            return { ...shift, isOverlapping: true };
          }
        }
        return shift;
      });
      return { shifts: updatedShifts };
    }),
    
  cancelShift: (shiftId) =>
    set((state) => {
      const updatedShifts = state.shifts.map((shift) => {
        if (shift.id === shiftId) {
          return { ...shift, isBooked: false };
        }
        // Reset overlapping status for other shifts
        if (!shift.isBooked) {
          const targetShift = state.shifts.find(s => s.id === shiftId);
          if (targetShift && isOverlapping(shift, targetShift)) {
            return { ...shift, isOverlapping: false };
          }
        }
        return shift;
      });
      return { shifts: updatedShifts };
    }),
    
  setSelectedCity: (city) => set({ selectedCity: city }),
}));