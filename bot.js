const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { codeValidator } = require('./utils/codeValidator');
const { createValidationButtons } = require('./utils/buttonHandler');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Store pending validations to track button interactions
const pendingValidations = new Map();

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Try to find codes in the message
  const codes = codeValidator.findCodes(message.content);

  if (codes.length > 0) {
    for (const code of codes) {
      // Create an embed with the found code
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🔍 Code Detected')
        .setDescription(`Found code: **${code}**`)
        .setFooter({ text: 'Is this a valid code?' });

      // Create buttons for validation
      const buttons = createValidationButtons();

      // Send the message with buttons
      const response = await message.reply({
        embeds: [embed],
        components: [buttons],
      });

      // Store the validation data
      pendingValidations.set(response.id, {
        code: code,
        channelId: message.channelId,
        authorId: message.author.id,
        messageId: response.id,
      });
    }
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  const validationData = pendingValidations.get(interaction.message.id);

  if (!validationData) {
    await interaction.reply({ content: 'This validation has expired.', ephemeral: true });
    return;
  }

  // Check if the user who clicked is the same as the one who sent the message
  if (interaction.user.id !== validationData.authorId) {
    await interaction.reply({ content: 'Only the message author can validate this code.', ephemeral: true });
    return;
  }

  if (interaction.customId === 'validate_yes') {
    try {
      const channel = await client.channels.fetch(validationData.channelId);

      // Check if bot has permission to manage channel
      if (!channel.manageable) {
        await interaction.reply({
          content: '❌ I don\'t have permission to manage this channel.',
          ephemeral: true,
        });
        return;
      }

      // Update channel topic
      await channel.setTopic(validationData.code);

      // Send confirmation message
      await interaction.reply({
        content: `✅ Code **${validationData.code}** confirmed! Channel topic updated.`,
      });

      // Clean up
      pendingValidations.delete(validationData.messageId);
    } catch (error) {
      console.error('Error updating channel topic:', error);
      await interaction.reply({
        content: '❌ An error occurred while updating the channel topic.',
        ephemeral: true,
      });
    }
  } else if (interaction.customId === 'validate_no') {
    await interaction.reply({
      content: `❌ Code **${validationData.code}** rejected. No changes made.`,
      ephemeral: true,
    });

    // Clean up
    pendingValidations.delete(validationData.messageId);
  }
});

client.login(process.env.DISCORD_TOKEN);
