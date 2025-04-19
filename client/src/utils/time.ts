export const formatTime = (day: string, showTime: boolean = true) =>
   new Date(day).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      hour: showTime ? '2-digit' : undefined,
      minute: showTime ? 'numeric' : undefined,
      month: 'short',
   });
