const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client();

const token = 'MTE3ODA5MzgyMjc4MjIzMDU3OQ.Gudb0H.eCxCr8rhG7aY9OCQf92PBYrDj8fe6Yd3bEEJOk';

client.on('message', (message) => {
  if (message.content === '!redemarrer' && message.author.id === '892156050080424067') {
    message.channel.send('Redémarrage en cours...');
    client.destroy();
    client.login(token);
  }
});

client.login(token);
