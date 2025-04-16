export const formatTime = (day: string) =>
   new Date(day).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: 'numeric',
      month: 'short',
   });
