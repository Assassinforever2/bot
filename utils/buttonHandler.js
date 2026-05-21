const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

/**
 * Create action row with Yes/No buttons for code validation
 * @returns {ActionRowBuilder} Discord action row with buttons
 */
function createValidationButtons() {
  const yesButton = new ButtonBuilder()
    .setCustomId('validate_yes')
    .setLabel('✅ Yes')
    .setStyle(ButtonStyle.Success);

  const noButton = new ButtonBuilder()
    .setCustomId('validate_no')
    .setLabel('❌ No')
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(yesButton, noButton);

  return row;
}

module.exports = { createValidationButtons };
