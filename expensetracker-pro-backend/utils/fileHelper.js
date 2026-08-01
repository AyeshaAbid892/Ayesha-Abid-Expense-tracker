const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'expenses.json');

/**
 * Reads all expenses from the JSON data file.
 * Returns an empty array if the file does not exist or cannot be parsed.
 */
function readExpenses() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const rawContent = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(rawContent);
  } catch (err) {
    return [];
  }
}

/**
 * Writes the given expenses array to the JSON data file as pretty-printed JSON.
 * Creates the data directory first if it does not exist yet.
 */
function writeExpenses(expenses) {
  const dataDirectory = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

module.exports = { readExpenses, writeExpenses };
