export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  // Check if it's a Firestore Timestamp object
  if (timestamp.toDate) {
    return new Date(timestamp.toDate()).toLocaleDateString("en-US");
  }
  // Assume it's a Date object or compatible string
  return new Date(timestamp).toLocaleDateString("en-US");
};

export const calculateDollarsPerUnit = (transactions) => {
  let totalRevenue = 0;
  let totalUnitsSold = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "Sale") {
      totalRevenue += transaction.moneyIn || 0;
      totalUnitsSold += transaction.units || 0;
    }
  });

  if (totalUnitsSold === 0) {
    return 0; // Avoid division by zero
  }
  return totalRevenue / totalUnitsSold;
};

export const calculateNetCashFlow = (transactions, period = "overall") => {
  let inflow = 0;
  let outflow = 0;
  const now = new Date();

  transactions.forEach((t) => {
    const transactionDate = t.date?.toDate ? t.date.toDate() : new Date(t.date);

    let includeTransaction = false;
    if (period === "overall") {
      includeTransaction = true;
    } else if (period === "daily") {
      includeTransaction =
        transactionDate.getDate() === now.getDate() &&
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear();
    } else if (period === "weekly") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      includeTransaction =
        transactionDate >= oneWeekAgo && transactionDate <= now;
    } else if (period === "monthly") {
      includeTransaction =
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear();
    }

    if (includeTransaction) {
      if (t.moneyIn) inflow += t.moneyIn;
      if (t.moneyOut) outflow += t.moneyOut;
    }
  });

  return inflow - outflow;
};

export const calculateTotalUnitsInStock = (transactions) => {
  let totalUnits = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "Purchase") {
      totalUnits += transaction.units || 0;
    } else if (transaction.type === "Sale") {
      totalUnits -= transaction.units || 0;
    }
    // Expenses and Gifts don't affect units in stock directly
  });
  return totalUnits;
};

export const calculateTotalCashBalance = (transactions) => {
  let balance = 0;
  transactions.forEach((transaction) => {
    balance += transaction.moneyIn || 0;
    balance -= transaction.moneyOut || 0;
  });
  return balance;
};

export const getAccountColorClass = (colorName) => {
  const colors = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
    pink: "bg-pink-500",
  };
  return colors[colorName] || "bg-gray-500"; // Default if no match
};

export const getTransactionTypeColor = (type) => {
  switch (type) {
    case "Sale":
      return "text-success";
    case "Purchase":
      return "text-blue-500"; // Neutral or a specific color
    case "Expense":
      return "text-danger";
    case "Gift":
      return "text-purple-500"; // Or any other distinguishing color
    default:
      return "text-text-DEFAULT dark:text-text-darker";
  }
};

export const getMoneyFlowColor = (amount) => {
  return amount >= 0 ? "text-success" : "text-danger";
};
