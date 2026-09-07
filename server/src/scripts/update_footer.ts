import mongoose from 'mongoose';
import { env } from '../config/env.js';

async function updateFooter() {
  console.log('Connecting to Mongo...');
  await mongoose.connect(env.MONGO_URI);
  const res = await mongoose.connection.db?.collection('sitesettings').updateOne(
    {},
    {
      $set: {
        'footer.email': 'algowinner01official@gmail.com',
        'footer.mobile': '+91 9369348311',
        'footer.instagramUrl': 'https://www.instagram.com/algowinner01?igsi=c294MDhkcDM2bDg0',
        'footer.twitterUrl': 'https://x.com/algowinner01',
        'footer.telegramUrl': 'https://t.me/algowinner01',
      },
    }
  );
  console.log('UPDATE_RESULT:', res);
  const updated = await mongoose.connection.db?.collection('sitesettings').findOne();
  console.log('UPDATED_FOOTER:', updated?.footer);
  process.exit(0);
}

updateFooter().catch((err) => {
  console.error(err);
  process.exit(1);
});
