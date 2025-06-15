import React, { useState } from "react";
import { useData } from "../context/DataContext";
import GlassCard from "../components/common/GlassCard";
import SectionHeader from "../components/common/SectionHeader";
import TransactionCard from "../components/transactions/TransactionCard";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import TransactionDetails from "../components/transactions/TransactionDetails";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import KeyIndicatorsCard from "../components/dashboard/KeyIndicatorsCard";
import AccountBalancesCard from "../components/dashboard/AccountBalancesCard";
import CashFlowlyCard from "../components/dashboard/CashFlowlyCard";

const Dashboard = () => {
  const { transactions = [], loading, deleteTransaction, settings } = useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const unitLabel = settings?.unitLabel || "units";

  const handleOpenAddModal = () => {
    setTransactionToEdit(null);
    setIsAddModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
    setIsAddModalOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        setIsDetailsModalOpen(false);
      } catch (error) {
        console.error("Failed to delete transaction:", error);
        alert("Error deleting transaction. Please try again.");
      }
    }
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto font-sans">
      <GlassCard>
        <SectionHeader id="welcome" title="Dashboard" />
        <p className="text-text-base dark:text-text-light text-base">
          Monitor your finances at a glance.
        </p>
      </GlassCard>

      {[
        {
          id: "key-metrics",
          title: "Key Metrics",
          Component: KeyIndicatorsCard,
        },
        {
          id: "account-balances",
          title: "Account Balances",
          Component: AccountBalancesCard,
        },
        { id: "cash-flow", title: "Cash Flow", Component: CashFlowlyCard },
      ].map(({ id, title, Component }) => (
        <GlassCard key={id}>
          <SectionHeader id={id} title={title} />
          <Component />
        </GlassCard>
      ))}

      <GlassCard>
        <SectionHeader
          id="recent-transactions"
          title="Recent Transactions"
          action={
            transactions.length > 0 && (
              <Link to="/transactions">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            )
          }
        />
        {loading ? (
          <div className="flex flex-col justify-center items-center h-40 py-6">
            <Spinner size="lg" color="primary" />
            <span className="mt-3 text-text-base dark:text-text-light">
              Loading transactions...
            </span>
          </div>
        ) : recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={() => handleEditTransaction(transaction)}
                onDelete={() => handleDeleteTransaction(transaction.id)}
                onView={() => handleViewTransaction(transaction)}
                unitLabel={unitLabel}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-text-base dark:text-text-light opacity-75 mb-4">
              No recent transactions.
            </p>
            <Button variant="primary" onClick={handleOpenAddModal}>
              <MdAdd className="mr-2" /> Add Transaction
            </Button>
          </div>
        )}
      </GlassCard>

      <button
        onClick={handleOpenAddModal}
        className="fixed bottom-6 right-6 bg-primary-light p-3 rounded-full shadow-glass-light dark:shadow-glass-dark hover:bg-primary-dark focus:ring-4 focus:ring-secondary-light focus:ring-opacity-50 transition-all-ease duration-fast z-50 transform hover:scale-105"
        aria-label="Add new transaction"
      >
        <MdAdd size={20} className="text-text-light" />
      </button>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        transactionToEdit={transactionToEdit}
      />

      <TransactionDetails
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
        onEdit={handleEditTransaction}
        onDelete={handleDeleteTransaction}
        unitLabel={unitLabel}
      />
    </div>
  );
};

export default Dashboard;
