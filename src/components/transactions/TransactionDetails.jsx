import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import GlassCard from "../common/GlassCard";
import {
  formatDate,
  formatCurrency,
  getMoneyFlowColor,
} from "../../utils/helpers";
import { useData } from "../../context/DataContext";

const TransactionDetails = ({
  isOpen,
  onClose,
  transaction,
  onEdit,
  onDelete,
  unitLabel,
}) => {
  if (!transaction) return null;

  const { accounts } = useData();
  const moneyDisplay = transaction.moneyIn
    ? formatCurrency(transaction.moneyIn)
    : formatCurrency(transaction.moneyOut);
  const account = accounts.find((acc) => acc.id === transaction.accountId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaction Details">
      <GlassCard className="p-6 space-y-4 font-sans">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-medium text-text-muted dark:text-text-dark font-mono">
              Date
            </label>
            <p className="text-base text-text-base dark:text-text-light">
              {formatDate(transaction.date)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-muted dark:text-text-dark font-mono">
              Type
            </label>
            <p className="text-base text-text-base dark:text-text-light">
              {transaction.type}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-muted dark:text-text-dark font-mono">
              Customer/Vendor
            </label>
            <p className="text-base text-text-base dark:text-text-light">
              {transaction.customerVendor || "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-muted dark:text-text-dark font-mono">
              Amount
            </label>
            <p
              className={`text-base font-medium ${getMoneyFlowColor(
                transaction.moneyIn || -transaction.moneyOut
              )}`}
            >
              {(transaction.moneyIn || -transaction.moneyOut) > 0 ? "+" : "-"}{" "}
              {moneyDisplay}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-muted dark:text-text-dark font-mono">
              Account
            </label>
            <p className="text-base text-text-base dark:text-text-light">
              {account ? account.name : "Unknown"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-muted dark:text-text-dark font-mono">
              {unitLabel}
            </label>
            <p className="text-base text-text-base dark:text-text-light">
              {transaction.units || transaction.units === 0
                ? `${transaction.units} ${unitLabel}`
                : "N/A"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-muted dark:text-text-dark font-mono">
              Notes
            </label>
            <p className="text-base text-text-base dark:text-text-light">
              {transaction.notes || "N/A"}
            </p>
          </div>{" "}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={onClose} className="text-sm">
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onEdit(transaction);
            }}
            className="text-sm"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onDelete(transaction.id);
            }}
            className="text-sm"
          >
            Delete
          </Button>
        </div>
      </GlassCard>
    </Modal>
  );
};

export default TransactionDetails;
