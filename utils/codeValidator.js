/**
 * Code Validator
 * Detects and validates custom codes made of consonants and specific numbers
 * Format: 4-6 characters from [BCDFGHJKLMNPQRSTVWXYZ, 1, 2, 3, 7, 8, 9]
 */

const CONSONANTS = 'BCDFGHJKLMNPQRSTVWXYZ';
const ALLOWED_NUMBERS = '123789';
const VALID_CHARACTERS = CONSONANTS + ALLOWED_NUMBERS;

const codeValidator = {
  /**
   * Check if a string is a valid code
   * @param {string} code - The code to validate
   * @returns {boolean} True if valid
   */
  isValidCode(code) {
    // Check length (4-6 characters)
    if (code.length < 4 || code.length > 6) {
      return false;
    }

    // Check if all characters are valid
    for (const char of code.toUpperCase()) {
      if (!VALID_CHARACTERS.includes(char)) {
        return false;
      }
    }

    return true;
  },

  /**
   * Find all valid codes in a message
   * @param {string} message - The message content
   * @returns {string[]} Array of found codes
   */
  findCodes(message) {
    // Regex to find potential codes (4-6 consecutive valid characters)
    const codeRegex = new RegExp(`[${VALID_CHARACTERS}]{4,6}`, 'g');
    const potentialCodes = message.match(codeRegex) || [];

    // Filter to only valid codes and remove duplicates
    const validCodes = [...new Set(potentialCodes.filter(code => this.isValidCode(code)))].map(c => c.toUpperCase());

    return validCodes;
  },

  /**
   * Get information about valid characters
   * @returns {object} Object with consonants and allowed numbers
   */
  getValidCharacters() {
    return {
      consonants: CONSONANTS.split(''),
      allowedNumbers: ALLOWED_NUMBERS.split(''),
      totalLength: '4-6 characters',
    };
  },
};

module.exports = { codeValidator };
