export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  city: string;
  isBooked: boolean;
  isOverlapping?: boolean;
  isStarted?: boolean;
}

export type GroupedShifts = {
  [date: string]: Shift[];
};

export const COLORS = {
  white: '#F7F8FB',
  lightGray: '#F1F4F8',
  mediumGray: '#CBD2E1',
  darkGray: '#A4B8D3',
  blue: '#004FB4',
  lightBlue: '#4F6C92',
  pink: '#EED2DF',
  darkPink: '#FE93B3',
  red: '#E2006A',
  mint: '#CAEFD8',
  lightGreen: '#55CB82',
  green: '#16A64D',
};