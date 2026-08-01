const { writeUsers } = require('../utils/userHelper');
const { writeExpenses } = require('../utils/fileHelper');
const { writeNotifications } = require('../utils/notificationHelper');

const users = [
  {
    id: 'demo-user-1',
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    avatarColor: '#6366f1',
    initials: 'AK',
    monthlyIncome: 180000,
    monthlyBudget: 120000,
  },
  {
    id: 'demo-user-2',
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    avatarColor: '#0891b2',
    initials: 'BA',
    monthlyIncome: 250000,
    monthlyBudget: 150000,
  },
  {
    id: 'demo-user-3',
    name: 'Sana Malik',
    email: 'sana.malik@example.com',
    avatarColor: '#d946ef',
    initials: 'SM',
    monthlyIncome: 140000,
    monthlyBudget: 90000,
  },
];

const CATEGORIES = ['food', 'transport', 'shopping', 'utilities', 'health', 'other'];

const TITLES_BY_CATEGORY = {
  food: ['Grocery shopping', 'Dinner at Cafe Aylanto', 'Coffee run', 'Lunch with team', 'Bakery order'],
  transport: ['Uber to office', 'Fuel top-up', 'Careem ride', 'Parking fee', 'Metro card recharge'],
  shopping: ['New headphones', 'Clothing haul', 'Home decor', 'Online electronics order', 'Gift for friend'],
  utilities: ['Electricity bill', 'Internet bill', 'Mobile postpaid bill', 'Water bill', 'Gas bill'],
  health: ['Pharmacy purchase', 'Doctor visit', 'Gym membership', 'Dental checkup', 'Vitamins'],
  other: ['Subscription renewal', 'Charity donation', 'Miscellaneous', 'Book purchase', 'Stationery'],
};

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(list) {
  return list[randomBetween(0, list.length - 1)];
}

function generateExpensesForUser(userId, monthsBack) {
  const expenses = [];
  const now = new Date();

  for (let monthOffset = monthsBack; monthOffset >= 0; monthOffset -= 1) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const transactionsThisMonth = randomBetween(8, 14);

    for (let i = 0; i < transactionsThisMonth; i += 1) {
      const category = randomItem(CATEGORIES);
      const title = randomItem(TITLES_BY_CATEGORY[category]);
      const day = randomBetween(1, 27);
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      const amount = category === 'utilities' || category === 'health'
        ? randomBetween(2000, 12000)
        : randomBetween(300, 9000);

      expenses.push({
        id: date.getTime() + randomBetween(1, 999),
        userId,
        title,
        amount,
        category,
        date: date.toISOString().split('T')[0],
        description: '',
        createdAt: date.toISOString(),
      });
    }
  }

  return expenses;
}

function seed() {
  writeUsers(users);

  let allExpenses = [];
  users.forEach((user) => {
    allExpenses = allExpenses.concat(generateExpensesForUser(user.id, 5));
  });
  allExpenses.sort((a, b) => a.id - b.id);
  writeExpenses(allExpenses);

  const notifications = [
    {
      id: 1,
      userId: 'demo-user-1',
      title: 'Budget alert',
      message: "You've used 82% of your monthly budget.",
      type: 'warning',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      userId: 'demo-user-1',
      title: 'Expense added',
      message: 'Grocery shopping (PKR 2,500) was logged.',
      type: 'info',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      userId: 'demo-user-1',
      title: 'Weekly summary ready',
      message: 'Your spending report for last week is ready to view.',
      type: 'success',
      read: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      userId: 'demo-user-2',
      title: 'Savings milestone',
      message: 'You saved PKR 40,000 more than last month. Nice work!',
      type: 'success',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      userId: 'demo-user-3',
      title: 'Budget alert',
      message: "You've exceeded your shopping category budget.",
      type: 'warning',
      read: false,
      createdAt: new Date().toISOString(),
    },
  ];
  writeNotifications(notifications);

  console.log(`Seeded ${users.length} users and ${allExpenses.length} expenses.`);
}

seed();
