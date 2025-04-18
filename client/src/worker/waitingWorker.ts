let socket: WebSocket;
let subscribedDoctorIds: string[] = [];

const waitForSocketOpen = (socket: WebSocket): Promise<void> =>
   new Promise((resolve, reject) => {
      const maxAttempts = 10;
      let attempt = 0;
      const interval = setInterval(() => {
         if (socket.readyState === WebSocket.OPEN) {
            clearInterval(interval);
            resolve();
         } else if (++attempt >= maxAttempts) {
            clearInterval(interval);
            reject(new Error('WebSocket failed to open.'));
         }
      }, 200);
   });

const sendMessage = async (msg: any) => {
   try {
      await waitForSocketOpen(socket);
      socket.send(JSON.stringify(msg));
   } catch (err) {
      console.error('Failed to send:', err);
   }
};

onmessage = async (event) => {
   const { type, doctorId, token } = event.data;

   if (type === 'init') {
      socket = new WebSocket(`ws://localhost:8080?token=${token}`);
      socket.onmessage = (e) => {
         const data = JSON.parse(e.data);
         if (data.type === 'slot_update') {
            postMessage({ type: 'SLOT_UPDATE', payload: data.payload });
         }
      };
   }

   if (type === 'subscribe' && !subscribedDoctorIds.includes(doctorId)) {
      subscribedDoctorIds.push(doctorId);
      sendMessage({ type: 'subscribe', doctorId });
   }

   if (type === 'unsubscribe') {
      subscribedDoctorIds = subscribedDoctorIds.filter((id) => id !== doctorId);
      sendMessage({ type: 'unsubscribe', doctorId });
   }
};
