import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import TransactionCard from "../components/transactions/TransactionCard";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import TransactionDetails from "../components/transactions/TransactionDetails";
import TransactionFilterSort from "../components/transactions/TransactionFilterSort";
import { MdAdd, MdFilterList } from "react-icons/md";
import Spinner from "../components/common/Spinner";
import GlassCard from "../components/common/GlassCard";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";

const Transactions = () => {
  const { transactions, accounts, loading, deleteTransaction, settings } =
    useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "",
    dateRange: "",
    sortBy: "dateDesc",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const unitLabel = settings?.unitLabel || "units";

  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm || filters.type || filters.dateRange;
  }, [filters]);

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

  const applyFilters = () => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    const newFilters = {
      searchTerm: "",
      type: "",
      dateRange: "",
      sortBy: "dateDesc",
    };
    setFilters(newFilters);
    setAppliedFilters(newFilters);
    setIsFilterOpen(false);
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...(transactions || [])];

    if (appliedFilters.searchTerm) {
      const lowerSearchTerm = appliedFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.customerVendor?.toLowerCase().includes(lowerSearchTerm) ||
          t.notes?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (appliedFilters.type) {
      filtered = filtered.filter((t) => t.type === appliedFilters.type);
    }

    if (appliedFilters.dateRange) {
      const days = parseInt(appliedFilters.dateRange);
      if (!isNaN(days)) {
        const start = new Date();
        start.setDate(start.getDate() - days);
        const startTime = start.getTime();
        filtered = filtered.filter((t) => {
          const transactionDate = t.date?.toDate
            ? t.date.toDate().getTime()
            : new Date(t.date).getTime();
          return transactionDate >= startTime;
        });
      }
    }

    filtered.sort((a, b) => {
      const dateA = a.date?.toDate
        ? a.date.toDate().getTime()
        : new Date(a.date).getTime();
      const dateB = b.date?.toDate
        ? b.date.toDate().getTime()
        : new Date(t.date).getTime();
      const amountA = (a.moneyIn || 0) + (a.moneyOut || 0);
      const amountB = (b.moneyIn || 0) + (b.moneyOut || 0);

      switch (appliedFilters.sortBy) {
        case "dateDesc":
          return dateB - dateA;
        case "dateAsc":
          return dateA - dateB;
        case "amountDesc":
          return amountB - amountA;
        case "amountAsc":
          return amountA - amountB;
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, appliedFilters]);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto font-sans">
      <GlassCard>
        <SectionHeader
          id="transactions"
          title="Transactions"
          action={
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="relative text-text-base dark:text-text-light p-2 rounded-md bg-primary-light/20 dark:bg-secondary-light/20 hover:bg-primary-light/30 dark:hover:bg-secondary-light/30 focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast"
              aria-label={
                isFilterOpen ? "Close filter menu" : "Open filter menu"
              }
              aria-expanded={isFilterOpen}
            >
              <MdFilterList size={28} />
              {hasActiveFilters && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
              )}
            </button>
          }
        />
        {loading ? (
          <div className="flex flex-col justify-center items-center h-40 py-6">
            <Spinner size="lg" color="primary" />
            <span className="mt-3 text-text-base dark:text-text-light">
              Loading transactions...
            </span>
          </div>
        ) : filteredAndSortedTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedTransactions.map((transaction) => (
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
              No transactions found matching your criteria.
            </p>
            <Button variant="primary" onClick={handleOpenAddModal}>
              <MdAdd className="mr-2" /> Add Transaction
            </Button>
          </div>
        )}
      </GlassCard>
      {isFilterOpen && (
        <div className="absolute top-20 right-6 z-50 bg-background-base/80 dark:bg-background-dark/80 backdrop-blur-md border border-primary-light/20 rounded-xl shadow-glass-light dark:shadow-glass-dark p-4 w-80 max-w-full transition-all-ease duration-smooth">
          <TransactionFilterSort
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />
        </div>
      )}
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

export default Transactions;
