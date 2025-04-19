const WS_BASE = import.meta.env.PROD
   ? 'wss://mediclick.onrender.com/ws'
   : 'ws://localhost:5000/ws';

let socket: WebSocket;
let subscribedDoctorIds: string[] = [];

const waitForOpenConnection = (socket: WebSocket): Promise<void> => {
   return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
         if (socket.readyState === WebSocket.OPEN) {
            clearInterval(interval);
            resolve();
         }
      }, 100);
      setTimeout(() => {
         clearInterval(interval);
         reject(new Error('Timeout while connecting to WebSocket'));
      }, 5000);
   });
};

const sendMessage = async (message: any) => {
   try {
      await waitForOpenConnection(socket);
      socket.send(JSON.stringify(message));
   } catch (err) {
      console.error('Failed to send WebSocket message:', err);
   }
};

onmessage = (event) => {
   const { type, doctorId, token } = event.data;

   if (type === 'init') {
      socket = new WebSocket(`${WS_BASE}?token=${token}`);
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
