import React from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import Button from "../common/Button";

const TransactionFilterSort = ({
  filters,
  setFilters,
  onApplyFilters,
  onClearFilters,
}) => {
  const transactionTypeOptions = [
    { value: "", label: "All Types" },
    { value: "Sale", label: "Sale" },
    { value: "Purchase", label: "Purchase" },
    { value: "Expense", label: "Expense" },
    { value: "Gift", label: "Gift" },
  ];

  const dateRangeOptions = [
    { value: "", label: "All Time" },
    { value: "7", label: "Last 7 Days" },
    { value: "30", label: "Last 30 Days" },
    { value: "90", label: "Last 90 Days" },
  ];

  const sortOptions = [
    { value: "dateDesc", label: "Newest First" },
    { value: "dateAsc", label: "Oldest First" },
    { value: "amountDesc", label: "Amount High to Low" },
    { value: "amountAsc", label: "Amount Low to High" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-text-base dark:text-text-light font-mono">
        Filter & Sort
      </h3>
      <InputField
        label="Search"
        id="searchTerm"
        value={filters.searchTerm}
        onChange={handleChange}
        placeholder="Customer, Vendor, Notes"
        className="w-full"
      />
      <SelectField
        label="Type"
        id="type"
        value={filters.type}
        onChange={handleChange}
        options={transactionTypeOptions}
        className="w-full"
      />
      <SelectField
        label="Date Range"
        id="dateRange"
        value={filters.dateRange}
        onChange={handleChange}
        options={dateRangeOptions}
        className="w-full"
      />
      <SelectField
        label="Sort By"
        id="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        options={sortOptions}
        className="w-full"
      />
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="text-text-base dark:text-text-light border-primary-light dark:border-secondary-light hover:bg-primary-light/20 dark:hover:bg-secondary-light/20 text-sm py-1 px-2"
        >
          Clear
        </Button>
        <Button
          onClick={onApplyFilters}
          variant="primary"
          className="bg-primary-light dark:bg-primary-light text-text-light hover:bg-primary dark:hover:bg-primary-dark text-sm py-1 px-2"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilterSort;
