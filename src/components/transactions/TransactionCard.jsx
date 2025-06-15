import React from "react";
import {
  formatDate,
  formatCurrency,
  getMoneyFlowColor,
  getAccountColorClass,
} from "../../utils/helpers";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from "../common/Button";
import GlassCard from "../common/GlassCard";

const TransactionCard = ({
  transaction,
  onEdit,
  onDelete,
  onView,
  unitLabel,
}) => {
  const moneyValue = transaction.moneyIn || -transaction.moneyOut;
  const moneyDisplay = transaction.moneyIn
    ? formatCurrency(transaction.moneyIn)
    : formatCurrency(transaction.moneyOut);

  return (
    <GlassCard
      className="relative cursor-pointer hover:bg-primary-light/10 dark:hover:bg-secondary-light/10 transition-all-ease duration-fast"
      onClick={onView}
      role="article"
      aria-label={`Transaction with ${
        transaction.customerVendor || transaction.type
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex-1 min-w-0 flex items-center">
          <div className="mr-3 p-2 rounded-md bg-primary-light/20">
            <span
              className={`h-6 w-6 rounded-full ${getAccountColorClass(
                transaction.accountColor
              )}`}
            />
          </div>
          <div className="flex-grow">
            <p className="text-xl font-semibold text-secondary-light dark:text-primary-light font-mono truncate">
              {transaction.customerVendor || `No ${transaction.type} info`}
            </p>
            <p className="text-sm text-text-light dark:text-text-base">
              {formatDate(transaction.date)}
              {(transaction.units || transaction.units === 0) &&
                ` | ${transaction.units} ${unitLabel}`}
            </p>
            {transaction.notes && (
              <p className="text-sm text-text-base dark:text-text-light mt-1 truncate">
                {transaction.notes}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p
            className={`text-2xl font-mono ${getMoneyFlowColor(
              moneyValue
            )} text-right min-w-[100px]`}
          >
            {moneyValue > 0 ? "+" : "-"} {moneyDisplay}
          </p>
          <div className="flex flex-col space-y-1">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              variant="ghost"
              size="sm"
              aria-label="Edit transaction"
            >
              <MdEdit className="h-5 w-5 text-primary-light" />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              variant="ghost"
              size="sm"
              aria-label="Delete transaction"
            >
              <MdDelete className="h-5 w-5 text-danger" />
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default TransactionCard;
