import React from "react";
import { useData } from "../../context/DataContext";
import { formatCurrency, getAccountColorClass } from "../../utils/helpers";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { TbCash } from "react-icons/tb";

const AccountBalancesCard = () => {
  const { accounts, totalCashBalance, loading } = useData();

  if (loading) {
    return (
      <div className="bg-background-base/30 dark:bg-background-dark/30 p-4 rounded-xl shadow-glass-light dark:shadow-glass-dark backdrop-blur-md border border-primary-light/10 flex flex-col justify-center items-center py-6 text-center">
        <Spinner size="md" color="primary" />
        <span className="mt-3 text-base font-sans text-text-base dark:text-text-light opacity-75">
          Loading account balances...
        </span>
      </div>
    );
  }

  const AccountItem = ({ color, name, balance }) => (
    <div className="bg-background-base/30 dark:bg-background-dark/30 p-4 rounded-xl shadow-glass-light dark:shadow-glass-dark backdrop-blur-md border border-primary-light/10 flex items-center transition-all-ease duration-smooth">
      <div className="mr-3 p-2 rounded-md bg-primary-light/20 flex items-center justify-center">
        <div
          className={`h-8 w-8 rounded-full ${getAccountColorClass(color)}`}
        />
      </div>
      <div className="flex-grow">
        <p className="text-xl border-b-2 border-primary-light pb-2 mb-2 font-bold text-text-base dark:text-text-light font-mono">
          {name}
        </p>
        <p className="text-3xl font-mono text-primary-light">
          {formatCurrency(balance || 0)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-background-base/30 dark:bg-background-dark/30 p-4 rounded-xl shadow-glass-light dark:shadow-glass-dark backdrop-blur-md border border-primary-light/10 flex items-center transition-all-ease duration-smooth">
        <div className="mr-3 p-2 rounded-md bg-primary-light/20 flex items-center justify-center">
          <TbCash className="h-8 w-8 text-primary-light" />
        </div>
        <div className="flex-grow">
          <p className="text-xl border-b-2 border-primary-light pb-2 mb-2 font-bold text-text-base dark:text-text-light font-mono">
            Total Cash Balance
          </p>
          <p className="text-3xl font-mono text-primary-light">
            {formatCurrency(totalCashBalance || 0)}
          </p>
        </div>
      </div>
      {accounts?.filter((acc) => acc.isActive).length > 0 ? (
        accounts
          .filter((acc) => acc.isActive)
          .map((account) => (
            <AccountItem
              key={account.id}
              color={account.color}
              name={account.name}
              balance={account.balance}
            />
          ))
      ) : (
        <div className="bg-background-base/30 dark:bg-background-dark/30 p-4 rounded-xl shadow-glass-light dark:shadow-glass-dark backdrop-blur-md border border-primary-light/10 flex items-center transition-all-ease duration-smooth">
          <div className="mr-3 p-2 rounded-md bg-primary-light/20 flex items-center justify-center">
            <div className="h-8 w-8" />
          </div>
          <div className="flex-grow">
            <p className="text-xl border-b-2 border-primary-light pb-2 mb-2 font-bold text-text-base dark:text-text-light font-mono">
              No Active Accounts
            </p>
            <p className="text-md text-text-base dark:text-text-light mt-1 font-sans">
              Add one to track balances
            </p>
            <Link to="/accounts">
              <Button
                variant="outline"
                className="mt-2 text-primary-light dark:text-secondary-light border-primary-light dark:border-secondary-light hover:bg-primary-light/20 dark:hover:bg-secondary-light/20 focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast"
              >
                Manage Accounts
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountBalancesCard;
