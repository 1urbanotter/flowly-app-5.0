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
          <h3 className="text-2xl font-mono font-semibold text-secondary-light dark:text-primary-light mb-2 border-b-2 border-primary/30">
            {" "}
            {account.name}{" "}
            {isDefault && (
              <span className="text-xs text-primary">(Default)</span>
            )}
          </h3>
          <p className="text-xl text-text-light dark:text-text-base">
            {" "}
            Balance:{" "}
            <span className="font-bold text-success">
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
          variant="secondary"
          className="text-sm" // Retain text-sm
        >
          <MdEdit size={18} />
          <span className="ml-1 sm:inline">Edit</span>
        </Button>
        <Button
          onClick={() => onDelete(account.id)}
          variant="outline"
          className="text-sm" // Retain text-sm
        >
          <MdDelete size={30} />
          <span className="mx-2 sm:inline">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
