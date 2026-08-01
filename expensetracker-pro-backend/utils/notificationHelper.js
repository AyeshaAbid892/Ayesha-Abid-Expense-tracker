const fs = require('fs');
const path = require('path');

const NOTIFICATIONS_FILE = path.join(__dirname, '..', 'data', 'notifications.json');

function readNotifications() {
  try {
    if (!fs.existsSync(NOTIFICATIONS_FILE)) return [];
    return JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, 'utf-8'));
  } catch (err) {
    return [];
  }
}

function writeNotifications(notifications) {
  const dir = path.dirname(NOTIFICATIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
}

module.exports = { readNotifications, writeNotifications };
