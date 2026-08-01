const { readNotifications } = require('../utils/notificationHelper');

function getUserNotifications(req, res) {
  const { userId } = req.params;
  const notifications = readNotifications().filter((item) => item.userId === userId);
  res.json({ success: true, count: notifications.length, data: notifications });
}

module.exports = { getUserNotifications };
