const { Client, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.once('ready', () => {
  console.log(`Bot online como ${client.user.tag}`);
});

// Envia os botões ao iniciar
client.on(Events.ClientReady, async () => {
  const channel = client.channels.cache.get('1431460007186137128'); // substitua pelo ID do canal onde quer enviar os botões
  if (!channel) return;

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('ping_bac').setLabel('💀 Ping-BAC').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ping_bfesp').setLabel('🗡️ Ping-BFEsp').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ping_cie').setLabel('🕵️ Ping-CIE').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ping_bpe').setLabel('👮 Ping-BPE').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ping_bip').setLabel('🪂 Ping-BIP').setStyle(ButtonStyle.Primary)
  );

  await channel.send({
    content: '📬 Escolha o ping da divisão e/ou brigada que você quer receber notificações de Testes de Aptidão Fiísica (TAF). Caso queira retirar o ping, basta clicar novamente :',
    components: [row]
  });
});

// Dá ou remove o cargo ao clicar
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isButton()) return;

  const roleMap = {
    ping_bac: 'Ping-BAC',
    ping_bfesp: 'Ping-BFEsp',
    ping_cie: 'Ping-CIE',
    ping_bpe: 'Ping-BPE',
    ping_bip: 'Ping-BIP'
  };

  const roleName = roleMap[interaction.customId];
  const role = interaction.guild.roles.cache.find(r => r.name === roleName);

  if (!role) {
    return interaction.reply({ content: `Cargo ${roleName} não encontrado.`, ephemeral: true });
  }

  const hasRole = interaction.member.roles.cache.has(role.id);

  if (hasRole) {
    await interaction.member.roles.remove(role);
    await interaction.reply({ content: `Cargo ${roleName} removido.`, ephemeral: true });
  } else {
    await interaction.member.roles.add(role);
    await interaction.reply({ content: `Cargo ${roleName} atribuído!`, ephemeral: true });
  }
});

client.login('MTQzMTQ3ODYzMzM0MzQ4ODA3MA.GdVBzp.2Flqa3auLivO9PuxprEnCqDw1YlscqgKy8vLFc'); // substitua pelo token do seu bot
