import React, { useState } from "react";
import {
  formatDate,
  formatCurrency,
  getMoneyFlowColor,
  getAccountColorClass,
} from "../../utils/helpers";
import { MdDelete, MdEdit } from "react-icons/md";
import Button from "../common/Button";

const TransactionCard = ({ transaction, onEdit, onDelete, unitLabel }) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      setIsSwiped(true);
    } else if (diffX < -50) {
      setIsSwiped(false);
    }
  };

  const handleTouchEnd = () => {
    // Optionally snap back if not enough swipe or apply a small delay
  };

  const moneyValue = transaction.moneyIn || -transaction.moneyOut;
  const moneyDisplay = transaction.moneyIn
    ? formatCurrency(transaction.moneyIn)
    : formatCurrency(transaction.moneyOut);

  return (
    <div
      className={`bg-background-base dark:bg-background-darker p-4 rounded-lg shadow-custom-light dark:shadow-custom-dark relative swipe-container overflow-hidden mb-3 ${
        isSwiped ? "swipe-left" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="swipe-content flex justify-between items-center">
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div className="mr-3 p-2 rounded-md bg-primary-light dark:bg-secondary-dark flex items-center justify-center">
              <span
                className={`h-8 w-8 rounded-full ${getAccountColorClass(
                  transaction.accountColor
                )}`}
              ></span>
            </div>
            <div className="flex-grow">
              <p className="text-xl border-b-2 border-primary dark:border-secondary-dark pb-2 mb-2 font-bold text-text-darker dark:text-text-light">
                {transaction.customerVendor || `No ${transaction.type} info`}
              </p>
              <p className="text-md text-text-darker dark:text-text-light mt-1">
                {formatDate(transaction.date)}
                {(transaction.units || transaction.units === 0) &&
                  ` | ${transaction.units} ${unitLabel}`}
              </p>
              {transaction.notes && (
                <p className="text-md text-text-darker dark:text-text-light mt-1">
                  {transaction.notes}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono text-primary dark:text-primary-light">
            {moneyValue > 0 ? "+" : "-"} {moneyDisplay}
          </p>
        </div>
      </div>

      <div className="swipe-actions">
        <Button
          onClick={() => onEdit(transaction)}
          variant="primary"
          className="mr-3 p-2 rounded-md bg-primary-light dark:bg-secondary-dark"
          aria-label="Edit transaction"
        >
          <MdEdit className="h-8 w-8 text-primary-dark dark:text-primary-dark" />
        </Button>
        <Button
          onClick={() => onDelete(transaction.id)}
          variant="danger"
          className="p-2 rounded-md bg-primary-light dark:bg-secondary-dark"
          aria-label="Delete transaction"
        >
          <MdDelete className="h-8 w-8 text-primary-dark dark:text-primary-dark" />
        </Button>
      </div>
    </div>
  );
};

export default TransactionCard;
