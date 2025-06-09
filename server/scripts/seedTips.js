const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const Tip = require("../models/tipsModel");

const tips = [
  {
    tip: "Track your expenses daily to enhance financial awareness and control.",
    link: "https://www.forbes.com/sites/truetamplin/2025/01/15/the-benefits-of-expense-tracking-and-how-you-can-do-it-effectively/",
  },
  {
    tip: "Create a realistic budget to decide how you'll spend your money each month.",
    link: "https://consumer.gov/your-money/making-budget",
  },
  {
    tip: "Build an emergency fund to cover three to six months of expenses.",
    link: "https://www.nerdwallet.com/article/banking/emergency-fund-why-it-matters",
  },
  {
    tip: "Build an emergency fund using automatic transfers and separate savings accounts.",
    link: "https://moneysmart.gov.au/saving/save-for-an-emergency-fund",
  },
  {
    tip: "Pay off high-interest debt first using the avalanche method to save on interest costs.",
    link: "https://www.equifax.com/personal/education/debt-management/articles/-/learn/manage-high-interest-rate/",
  },
  {
    tip: "Use the 50/30/20 budget rule: 50% for needs, 30% for wants, 20% for savings and debt repayment.",
    link: "https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator",
  },
  {
    tip: "Set specific financial goals to motivate your saving and spending habits.",
    link: "https://www.nerdwallet.com/article/finance/financial-goals-definition-examples",
  },
  {
    tip: "Avoid impulse purchases by implementing a waiting period before buying non-essential items.",
    link: "https://www.psychologytoday.com/us/blog/the-science-willpower/201111/3-brain-hacks-avoid-impulse-purchases-youll-later-regret",
  },
  {
    tip: "Use cash back credit cards strategically to earn rewards on everyday purchases.",
    link: "https://www.nerdwallet.com/best/credit-cards/cash-back",
  },
  {
    tip: "Calculate your net income first, then track spending to create an effective budget plan.",
    link: "https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/creating-a-budget",
  },
  {
    tip: "Use budgeting methods like envelope system or zero-based budgeting to build financial security.",
    link: "https://www.forbes.com/sites/truetamplin/2024/03/12/5-common-budgeting-methods-that-can-build-financial-security/",
  },
  {
    tip: "Avoid overspending and impulsive buying to prevent accumulating debt and financial stress.",
    link: "https://www.forbes.com/sites/truetamplin/2023/10/19/the-7-deadly-sins-of-household-expenses-and-how-to-avoid-them/",
  },
  {
    tip: "Use expense tracking apps and tools to monitor your monthly spending effectively.",
    link: "https://nomoredebts.org/financial-education/monthly-expense-tracker",
  },
  {
    tip: "Separate business and personal finances if you're a gig worker to maintain financial clarity.",
    link: "https://www.forbes.com/sites/truetamplin/2025/02/26/how-to-budget-as-a-gig-worker---8-tips-to-manage-your-money/",
  },
  {
    tip: "Record every expense, no matter how small, to create a complete financial picture.",
    link: "https://www.homecredit.co.in/en/paise-ki-paathshala/detail/10-effective-budgeting-strategies-for-saving-money",
  },
];

const seedTips = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await Tip.deleteMany({});
    await Tip.insertMany(tips);
    console.log("Tips seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTips();
