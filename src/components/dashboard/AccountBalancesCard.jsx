import React from "react";
import { useData } from "../../context/DataContext";
import { formatCurrency, getAccountColorClass } from "../../utils/helpers";
import Spinner from "../common/Spinner";
import GlassCard from "../common/GlassCard";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { TbCash } from "react-icons/tb";

const AccountBalancesCard = () => {
  const { accounts = [], totalCashBalance, loading } = useData();

  if (loading) {
    return (
      <GlassCard className="flex flex-col justify-center items-center py-6">
        <Spinner size="md" color="primary" />
        <span className="mt-3 text-text-base dark:text-text-light">
          Loading account balances...
        </span>
      </GlassCard>
    );
  }

  const AccountItem = ({ color, name, balance, icon }) => (
    <GlassCard className="flex items-center">
      <div className="mr-3 p-2 rounded-md bg-primary-light/20">
        {icon || (
          <span
            className={`h-6 w-6 rounded-full ${getAccountColorClass(color)}`}
          />
        )}
      </div>
      <div className="flex-grow">
        <p className="text-lg font-semibold text-text-base dark:text-text-light font-mono">
          {name}
        </p>
        <p className="text-xl font-mono text-primary-light dark:text-secondary-light">
          {formatCurrency(balance || 0)}
        </p>
      </div>
    </GlassCard>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <AccountItem
        name="Total Cash Balance"
        balance={totalCashBalance}
        icon={
          <TbCash className="h-6 w-6 text-primary-light dark:text-secondary-light" />
        }
      />
      {accounts.filter((acc) => acc.isActive).length > 0 ? (
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
        <GlassCard className="flex items-center">
          <div className="mr-3 p-2 rounded-md bg-primary-light/20">
            <div className="h-6 w-6" />
          </div>
          <div className="flex-grow">
            <p className="text-lg font-semibold text-text-base dark:text-text-light font-mono">
              No Active Accounts
            </p>
            <p className="text-sm text-text-base dark:text-text-dark mt-1">
              Add one to track balances
            </p>
            <Link to="/accounts">
              <Button variant="outline" size="sm" className="mt-2">
                Manage Accounts
              </Button>
            </Link>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default AccountBalancesCard;
