import React, { useState } from "react";
import { useData } from "../context/DataContext";
import Button from "../components/common/Button";
import { MdDownload, MdUpload } from "react-icons/md";
import { generateTransactionsPdf } from "../utils/pdfGenerator";
import {
  exportTransactionsToCsv,
  importCsvTransactions,
} from "../utils/csvHandler";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";

const Reports = () => {
  const { transactions, accounts, settings, addTransaction, loading } =
    useData();
  const { currentUser } = useAuth();
  const unitLabel = settings?.unitLabel || "units";
  const [isImporting, setIsImporting] = useState(false);

  const handleExportPdf = () => {
    if (transactions.length === 0) {
      toast.error("No transactions to export to PDF.");
      return;
    }
    generateTransactionsPdf(
      transactions,
      unitLabel,
      currentUser?.email || "Flowly User"
    );
    toast.success("PDF report generated successfully!");
  };

  const handleExportCsv = () => {
    if (transactions.length === 0) {
      toast.error("No transactions to export to CSV.");
      return;
    }
    exportTransactionsToCsv(transactions, unitLabel);
    toast.success("CSV file exported successfully!");
  };

  const handleImportCsv = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
    if (file.type !== "text/csv") {
      toast.error("Please select a CSV file.");
      return;
    }

    setIsImporting(true);
    try {
      const importedData = await importCsvTransactions(
        file,
        accounts,
        unitLabel
      );
      if (importedData.length === 0) {
        toast.error(
          "No valid transactions found in the CSV. Check your CSV format and account names."
        );
        return;
      }

      let successCount = 0;
      for (const transaction of importedData) {
        const added = await addTransaction(transaction); // addTransaction includes its own toast
        if (added) {
          successCount++;
        }
      }
      toast.success(`${successCount} transactions imported successfully!`);
    } catch (error) {
      console.error("CSV Import error:", error);
      toast.error(`Failed to import CSV: ${error.message}`);
    } finally {
      setIsImporting(false);
      event.target.value = null; // Clear file input
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-text-darker dark:text-text-darker mb-6">
        Reports & Data
      </h1>

      <div className="container-base mb-8">
        <h2 className="text-xl font-semibold text-text-darker dark:text-text-darker mb-4">
          Export Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleExportPdf}
            variant="primary"
            className="flex items-center justify-center"
          >
            <MdDownload size={20} className="mr-2" /> Export Transactions to PDF
          </Button>
          <Button
            onClick={handleExportCsv}
            variant="secondary"
            className="flex items-center justify-center"
          >
            <MdDownload size={20} className="mr-2" /> Export Transactions to CSV
          </Button>
        </div>
      </div>

      <div className="container-base">
        <h2 className="text-xl font-semibold text-text-darker dark:text-text-darker mb-4">
          Import Data
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Import transactions from a CSV file. Ensure your CSV has headers like
          "Date", "Type", "Customer/Vendor", "Account", "Money In", "Money Out",
          "Units ({unitLabel})", "Notes". The "Account" column must match an
          existing account name in Flowly.
        </p>
        <label
          htmlFor="csv-upload"
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer
          ${
            isImporting
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark focus:ring-primary"
          }`}
        >
          {isImporting ? (
            <>
              <Spinner size="w-5 h-5" color="border-white" className="mr-2" />{" "}
              Importing...
            </>
          ) : (
            <>
              <MdUpload size={20} className="mr-2" /> Import Transactions from
              CSV
            </>
          )}
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleImportCsv}
            className="hidden"
            disabled={isImporting || loading}
          />
        </label>
      </div>
    </div>
  );
};

export default Reports;
