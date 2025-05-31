import Papa from "papaparse";

export const exportTransactionsToCsv = (transactions, unitLabel) => {
  const data = transactions.map((t) => ({
    Date: t.date?.toDate ? t.date.toDate().toISOString().split("T")[0] : t.date,
    Type: t.type,
    "Customer/Vendor": t.customerVendor,
    Account: t.accountName, // Assuming accountName is available
    "Money In": t.moneyIn || "",
    "Money Out": t.moneyOut || "",
    [`Units (${unitLabel})`]: t.units || "",
    Notes: t.notes || "",
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "flowly_transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const importCsvTransactions = (file, accounts, unitLabel) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const importedTransactions = results.data
          .map((row) => {
            // Map CSV headers to transaction fields
            const account = accounts.find((acc) => acc.name === row["Account"]);
            const date = new Date(row["Date"]); // Ensure valid date object

            return {
              date: isNaN(date.getTime()) ? new Date() : date, // Fallback to current date if invalid
              type: row["Type"] || "Sale", // Default type
              customerVendor: row["Customer/Vendor"] || "N/A",
              accountId: account ? account.id : null, // Link to existing account
              accountName: account
                ? account.name
                : row["Account"] || "Unknown Account",
              moneyIn: parseFloat(row["Money In"]) || 0,
              moneyOut: parseFloat(row["Money Out"]) || 0,
              units: parseFloat(row[`Units (${unitLabel})`]) || 0,
              notes: row["Notes"] || "",
            };
          })
          .filter((t) => t.accountId !== null); // Only import transactions with a valid account

        if (importedTransactions.length === 0) {
          reject(
            new Error(
              "No valid transactions found in the CSV. Ensure 'Account' column matches existing accounts."
            )
          );
          return;
        }
        resolve(importedTransactions);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
