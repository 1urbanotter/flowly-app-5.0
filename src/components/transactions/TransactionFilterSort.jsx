import React from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import Button from "../common/Button";

const TransactionFilterSort = ({
  filters,
  setFilters,
  accounts,
  onApplyFilters,
  onClearFilters,
}) => {
  const accountOptions = accounts.map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const transactionTypeOptions = [
    { value: "", label: "All Types" },
    { value: "Sale", label: "Sale" },
    { value: "Purchase", label: "Purchase" },
    { value: "Expense", label: "Expense" },
    { value: "Gift", label: "Gift" },
  ];

  const sortOptions = [
    { value: "dateDesc", label: "Date (Newest First)" },
    { value: "dateAsc", label: "Date (Oldest First)" },
    { value: "amountDesc", label: "Amount (High to Low)" },
    { value: "amountAsc", label: "Amount (Low to High)" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container-base p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-text-DEFAULT dark:text-text-darker">
        Filter & Sort Transactions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InputField
          label="Search by Customer/Vendor/Notes"
          id="searchTerm"
          value={filters.searchTerm}
          onChange={handleChange}
          placeholder="e.g., John Doe, rent"
        />
        <SelectField
          label="Account"
          id="accountId"
          value={filters.accountId}
          onChange={handleChange}
          options={[{ value: "", label: "All Accounts" }, ...accountOptions]}
        />
        <SelectField
          label="Type"
          id="type"
          value={filters.type}
          onChange={handleChange}
          options={transactionTypeOptions}
        />
        <InputField
          label="Start Date"
          id="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleChange}
        />
        <InputField
          label="End Date"
          id="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleChange}
        />
        <SelectField
          label="Sort By"
          id="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          options={sortOptions}
        />
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <Button onClick={onClearFilters} variant="outline">
          Clear Filters
        </Button>
        <Button onClick={onApplyFilters} variant="primary">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilterSort;
