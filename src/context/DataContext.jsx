import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useAuth } from "../hooks/useAuth";
import { useFirestore, useUserSettings } from "../hooks/useFirestore";
import {
  calculateDollarsPerUnit,
  calculateNetCashFlow,
  calculateTotalUnitsInStock,
  calculateTotalCashBalance,
} from "../utils/helpers";
import toast from "react-hot-toast";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const {
    data: accounts,
    loading: accountsLoading,
    error: accountsError,
    addDocument: addAccount,
    updateDocument: updateAccount,
    deleteDocument: deleteAccount,
  } = useFirestore("accounts", userId);

  const {
    data: transactions,
    loading: transactionsLoading,
    error: transactionsError,
    addDocument: addTransaction,
    updateDocument: updateTransaction,
    deleteDocument: deleteTransaction,
  } = useFirestore("transactions", userId);

  const {
    settings,
    loading: settingsLoading,
    error: settingsError,
    updateSettings,
  } = useUserSettings(userId);

  const loading = accountsLoading || transactionsLoading || settingsLoading;
  const error = accountsError || transactionsError || settingsError;

  // Derived Metrics
  const dollarsToUnitsRatio = useMemo(
    () => calculateDollarsPerUnit(transactions),
    [transactions]
  );
  const totalUnitsInStock = useMemo(
    () => calculateTotalUnitsInStock(transactions),
    [transactions]
  );
  const totalCashBalance = useMemo(
    () => calculateTotalCashBalance(accounts), // Corrected to use accounts for total cash balance
    [accounts] // Dependency changed to accounts
  );
  const netCashFlowOverall = useMemo(
    () => calculateNetCashFlow(transactions, "overall"),
    [transactions]
  );
  const netCashFlowDaily = useMemo(
    () => calculateNetCashFlow(transactions, "daily"),
    [transactions]
  );
  const netCashFlowWeekly = useMemo(
    () => calculateNetCashFlow(transactions, "weekly"),
    [transactions]
  );
  const netCashFlowMonthly = useMemo(
    () => calculateNetCashFlow(transactions, "monthly"),
    [transactions]
  );

  // Merge account name into transactions for easier display
  const transactionsWithAccountNames = useMemo(() => {
    return transactions
      .map((transaction) => {
        const account = accounts.find(
          (acc) => acc.id === transaction.accountId
        );
        return {
          ...transaction,
          accountName: account ? account.name : "Unknown Account",
          accountColor: account ? account.color : "gray",
        };
      })
      .sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime()); // Sort by date descending
  }, [transactions, accounts]);

  const value = {
    accounts,
    transactions: transactionsWithAccountNames,
    settings,
    loading,
    error,
    addAccount,
    updateAccount,
    deleteAccount,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateSettings,
    dollarsToUnitsRatio,
    totalUnitsInStock,
    totalCashBalance,
    netCashFlowOverall,
    netCashFlowDaily,
    netCashFlowWeekly,
    netCashFlowMonthly,
  };

  if (error) {
    // Note: toast.error is an external library and its styling is not handled here.
    toast.error(`A data error occurred: ${error.message}`);
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
