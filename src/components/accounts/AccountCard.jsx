import React from "react";
import { formatCurrency, getAccountColorClass } from "../../utils/helpers";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from "../common/Button";

const AccountCard = ({
  account,
  onEdit,
  onDelete,
  isDefault,
  onSetDefault,
}) => {
  return (
    <div className="container-base flex flex-col sm:flex-row items-center justify-between p-4 mb-4">
      <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
        <div
          className={`w-3 h-3 rounded-full mr-3 ${getAccountColorClass(
            account.color
          )}`}
        ></div>
        <div>
          <h3 className="text-lg font-semibold text-text-base dark:text-text-dark">
            {" "}
            {account.name}{" "}
            {isDefault && (
              <span className="text-xs text-primary-DEFAULT">(Default)</span>
            )}
          </h3>
          <p className="text-sm text-text-light dark:text-text-darker">
            {" "}
            Balance:{" "}
            <span className="font-bold text-primary-DEFAULT">
              {" "}
              {formatCurrency(account.balance || 0)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
        {!isDefault && (
          <Button
            onClick={() => onSetDefault(account.id)}
            variant="ghost"
            className="text-sm" // Retain text-sm to potentially adjust padding/size if needed by Button component
          >
            Set Default
          </Button>
        )}
        <Button
          onClick={() => onEdit(account)}
          variant="primary"
          className="text-sm" // Retain text-sm
        >
          <MdEdit size={18} />{" "}
          <span className="ml-1 hidden sm:inline">Edit</span>
        </Button>
        <Button
          onClick={() => onDelete(account.id)}
          variant="danger"
          className="text-sm" // Retain text-sm
        >
          <MdDelete size={18} />{" "}
          <span className="ml-1 hidden sm:inline">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
