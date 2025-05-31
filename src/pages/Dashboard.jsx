import React, { useState } from "react";
import { useData } from "../context/DataContext";
import TransactionCard from "../components/transactions/TransactionCard";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import Button from "../components/common/Button";
import { MdAdd } from "react-icons/md";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import KeyIndicatorsCard from "../components/dashboard/KeyIndicatorsCard";
import AccountBalancesCard from "../components/dashboard/AccountBalancesCard";
import CashFlowlyCard from "../components/dashboard/CashFlowlyCard";

const Dashboard = () => {
  const { transactions, loading, deleteTransaction, settings } = useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const unitLabel = settings?.unitLabel || "units";

  const handleOpenAddModal = () => {
    setTransactionToEdit(null);
    setIsAddModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
    setIsAddModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error("Failed to delete transaction:", error);
        alert("Error deleting transaction. Please try again.");
      }
    }
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 bg-background-base dark:bg-background-dark bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 dark:bg-opacity-30 border border-primary-light/20 rounded-xl shadow-glass-light dark:shadow-glass-dark min-h-screen space-y-8 font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold text-primary-light dark:text-secondary-light font-mono tracking-wide">
        DASHBOARD
      </h1>

      {[
        { title: "Key Metrics", Component: KeyIndicatorsCard },
        { title: "Account Balances", Component: AccountBalancesCard },
        { title: "Cash Flow", Component: CashFlowlyCard },
      ].map(({ title, Component }) => (
        <section
          key={title}
          aria-labelledby={`section-${title.toLowerCase().replace(" ", "-")}`}
          role="region"
          className="container-base bg-background-base dark:bg-background-dark p-4 sm:p-6 rounded-xl shadow-glass-light dark:shadow-glass-dark backdrop-blur-sm bg-opacity-20 dark:bg-opacity-20 border border-primary-light/20 transition-all-ease duration-smooth"
        >
          <h2
            id={`section-${title.toLowerCase().replace(" ", "-")}`}
            className="text-xl sm:text-2xl font-semibold text-primary-light dark:text-secondary-light mb-4 sm:mb-6 font-mono tracking-wide"
          >
            {title.toUpperCase()}
          </h2>
          <Component />
        </section>
      ))}

      <section aria-labelledby="recent-transactions" role="region">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2
            id="recent-transactions"
            className="text-xl sm:text-2xl font-semibold text-secondary-light dark:text-text-light font-mono"
          >
            RECENT TRANSACTIONS
          </h2>
          {transactions.length > 0 && (
            <Link to="/transactions">
              <Button
                variant="outline"
                size="sm"
                className="text-primary-light dark:text-secondary-light border-white dark:border-secondary-light hover:bg-secondary-light/20 dark:hover:bg-secondary-light/20 focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast"
              >
                View All
              </Button>
            </Link>
          )}
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-40 py-6 text-center">
            <Spinner size="lg" color="primary" />
            <span className="mt-3 text-text-base dark:text-text-light font-sans">
              Loading transactions...
            </span>
          </div>
        ) : recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEditTransaction}
                onDelete={() => handleDeleteTransaction(transaction.id)}
                unitLabel={unitLabel}
              />
            ))}
          </div>
        ) : (
          <div className="container-base p-6 text-center bg-background-base dark:bg-background-dark bg-opacity-20 dark:bg-opacity-20 border border-primary-light/20 rounded-xl shadow-glass-light dark:shadow-glass-dark">
            <p className="text-text-base dark:text-text-light opacity-75 font-sans">
              No recent transactions.
            </p>
            <Button
              variant="primary"
              onClick={handleOpenAddModal}
              className="mt-4 bg-primary-light dark:bg-primary-light text-text-light hover:bg-primary dark:hover:bg-primary-dark transition-all-ease duration-fast"
              aria-label="Add new transaction"
            >
              <MdAdd className="mr-2" /> Add Transaction
            </Button>
          </div>
        )}
      </section>
      <button
        onClick={handleOpenAddModal}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-primary-light dark:bg-primary-light p-4 rounded-full shadow-glass-light dark:shadow-glass-dark hover:bg-primary dark:hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-secondary-light focus:ring-opacity-50 dark:focus:ring-offset-background-dark transition-all-ease duration-fast z-50 transform hover:scale-105"
        aria-label="Add new transaction"
      >
        <MdAdd size={28} className="text-text-light" />
      </button>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        transactionToEdit={transactionToEdit}
      />
    </div>
  );
};

export default Dashboard;
