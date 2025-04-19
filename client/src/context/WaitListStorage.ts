import { WaitlistState } from '../store/slices';

const KEY = 'waitlist-session';

export const saveWaitlist = (state: WaitlistState) => {
   sessionStorage.setItem(KEY, JSON.stringify(state));
};

export const loadWaitlist = () => {
   const data = sessionStorage.getItem(KEY);
   return data ? JSON.parse(data) : null;
};

export const clearWaitlist = () => {
   sessionStorage.removeItem(KEY);
};
