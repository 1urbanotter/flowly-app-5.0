import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import TransactionCard from "../components/transactions/TransactionCard";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import TransactionFilterSort from "../components/transactions/TransactionFilterSort";
import { MdAdd } from "react-icons/md";
import Spinner from "../components/common/Spinner";

const Transactions = () => {
  const { transactions, accounts, loading, deleteTransaction, settings } =
    useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    accountId: "",
    type: "",
    startDate: "",
    endDate: "",
    sortBy: "dateDesc",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

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
    await deleteTransaction(id);
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    const newFilters = {
      searchTerm: "",
      accountId: "",
      type: "",
      startDate: "",
      endDate: "",
      sortBy: "dateDesc",
    };
    setFilters(newFilters);
    setAppliedFilters(newFilters);
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by search term
    if (appliedFilters.searchTerm) {
      const lowerSearchTerm = appliedFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.customerVendor.toLowerCase().includes(lowerSearchTerm) ||
          t.notes.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filter by account
    if (appliedFilters.accountId) {
      filtered = filtered.filter(
        (t) => t.accountId === appliedFilters.accountId
      );
    }

    // Filter by type
    if (appliedFilters.type) {
      filtered = filtered.filter((t) => t.type === appliedFilters.type);
    }

    // Filter by date range
    if (appliedFilters.startDate) {
      const start = new Date(appliedFilters.startDate).getTime();
      filtered = filtered.filter((t) => {
        const transactionDate = t.date?.toDate
          ? t.date.toDate().getTime()
          : new Date(t.date).getTime();
        return transactionDate >= start;
      });
    }
    if (appliedFilters.endDate) {
      const end = new Date(appliedFilters.endDate);
      end.setDate(end.getDate() + 1); // Include the end date fully
      const endTime = end.getTime();
      filtered = filtered.filter((t) => {
        const transactionDate = t.date?.toDate
          ? t.date.toDate().getTime()
          : new Date(t.date).getTime();
        return transactionDate < endTime;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = a.date?.toDate
        ? a.date.toDate().getTime()
        : new Date(a.date).getTime();
      const dateB = b.date?.toDate
        ? b.date.toDate().getTime()
        : new Date(b.date).getTime();
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
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-text-darker dark:text-text-darker mb-6">
        Transactions
      </h1>

      <TransactionFilterSort
        filters={filters}
        setFilters={setFilters}
        accounts={accounts}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />

      <div className="container-base">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-darker dark:text-text-darker">
            All Transactions
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Spinner />
            <span className="ml-2 text-text-darker dark:text-text-darker">
              Loading transactions...
            </span>
          </div>
        ) : filteredAndSortedTransactions.length > 0 ? (
          <div>
            {filteredAndSortedTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
                unitLabel={unitLabel}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No transactions found matching your criteria.
          </p>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleOpenAddModal}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-darker transition-colors duration-200 z-50"
        aria-label="Add new transaction"
      >
        <MdAdd size={28} />
      </button>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        transactionToEdit={transactionToEdit}
      />
    </div>
  );
};

export default Transactions;
