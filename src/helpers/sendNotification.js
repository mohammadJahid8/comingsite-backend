import admin from 'firebase-admin';
import { serviceAccount } from '../../serviceAccountKey.js';

// import serviceAccount from '../../serviceAccountKey';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (tokens, title, body) => {
  const message = {
    notification: {
      title,
      body,
      image:
        'https://res.cloudinary.com/dbpog1ckt/image/upload/v1691940522/qmm5dnocgv3wpejd8afg.png',
    },
    tokens,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log('Successfully sent message:', response.responses);
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

export default sendNotification;
