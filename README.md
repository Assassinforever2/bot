# Discord Code Bot

A Discord bot that automatically detects custom 4-6 character codes made only from consonants and the numbers 1, 2, 3, 7, 8, and 9.

## Features

✅ **Automatic Code Detection** - Scans all messages for valid codes

✅ **Validation Buttons** - Prompts users to confirm if a detected code is valid

✅ **Channel Topic Updates** - Sets confirmed codes as the channel topic

✅ **Permission Checks** - Verifies bot has channel management permissions

✅ **User Authorization** - Only the message author can validate detected codes

## Valid Code Format

- **Length**: 4-6 characters
- **Consonants**: B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z
- **Numbers**: 1, 2, 3, 7, 8, 9

### Examples of Valid Codes
- `BCDM` (4 consonants)
- `B2D9` (consonants + allowed numbers)
- `XYZ123` (6 characters)

### Examples of Invalid Codes
- `ABCD` (contains vowel 'A')
- `BCD4` (contains disallowed number '4')
- `BC` (too short)
- `BCDFGH` (too long)

## Installation

### Prerequisites
- Node.js 18.0.0 or higher
- A Discord bot token

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Assassinforever2/bot.git
   cd bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Discord token
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

## Configuration

### .env File

```env
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
```

### Getting Your Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" tab and click "Add Bot"
4. Click "Copy" under the TOKEN section
5. Paste it into your `.env` file

### Bot Permissions

Your bot needs these permissions:
- `SEND_MESSAGES` - To reply with code detection messages
- `MANAGE_CHANNELS` - To update channel topics
- `READ_MESSAGE_HISTORY` - To process message content

## How It Works

1. **Message Detection** - Bot listens to all messages in servers it's in
2. **Code Parsing** - Extracts potential codes matching the format
3. **Validation** - Confirms codes match all criteria (length, allowed characters)
4. **User Prompt** - Sends an embed with Yes/No buttons asking for confirmation
5. **Action**
   - **Yes**: Updates channel topic to the code and sends confirmation
   - **No**: Silently rejects and cleans up

## File Structure

```
bot/
├── bot.js                 # Main bot file
├── utils/
│   ├── codeValidator.js   # Code validation logic
│   └── buttonHandler.js   # Button creation
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Development

For development with auto-reload:

```bash
npm run dev
```

This requires `nodemon` (included in devDependencies).

## Troubleshooting

### Bot not responding
- Check that your token is correct in `.env`
- Verify bot has `SEND_MESSAGES` permission in the server
- Check console for error messages

### Channel topic not updating
- Ensure bot has `MANAGE_CHANNELS` permission
- Verify the channel is not a stage channel
- Check bot's role hierarchy is above the channel permissions

### No codes detected
- Remember: only consonants and 1, 2, 3, 7, 8, 9 are valid
- Codes must be 4-6 characters long
- Test with a simple code like `BCDM`

## License

MIT
