import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import AccountCard from "../components/accounts/AccountCard";
import AccountForm from "../components/accounts/AccountForm";
import Button from "../components/common/Button";
import { MdAdd } from "react-icons/md";
import Spinner from "../components/common/Spinner";
import toast from "react-hot-toast";
import GlassCard from "../components/common/GlassCard";
import SectionHeader from "../components/common/SectionHeader";
import { getAccountColorClass, formatCurrency } from "../utils/helpers";

const Accounts = () => {
  const {
    accounts,
    loading,
    deleteAccount,
    updateSettings,
    settings,
    updateAccount,
  } = useData();
  const [isAccountFormOpen, setIsAccountFormOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);

  const handleOpenAccountForm = () => {
    setAccountToEdit(null);
    setIsAccountFormOpen(true);
  };

  const handleEditAccount = (account) => {
    setAccountToEdit(account);
    setIsAccountFormOpen(true);
  };

  const handleDeleteAccount = async (accountId) => {
    if (settings?.defaultAccountId === accountId) {
      toast.error(
        "Cannot delete the default account. Please set another account as default first."
      );
      return;
    }
    const success = await deleteAccount(accountId);
    if (success && settings?.defaultAccountId === accountId) {
      await updateSettings({ defaultAccountId: null });
    }
  };

  const handleSetDefaultAccount = async (accountId) => {
    if (accountId === settings?.defaultAccountId) {
      toast("This is already your default account.");
      return;
    }
    const success = await updateSettings({ defaultAccountId: accountId });
    if (success) {
      toast.success("Default account updated!");
    }
  };

  const toggleAccountActiveStatus = async (account) => {
    await updateAccount(account.id, { isActive: !account.isActive });
    toast.success(
      `Account ${account.name} has been ${
        account.isActive ? "deactivated" : "activated"
      }.`
    );
  };

  const activeAccounts = useMemo(
    () => accounts.filter((acc) => acc.isActive),
    [accounts]
  );
  const deactivatedAccounts = useMemo(
    () => accounts.filter((acc) => !acc.isActive),
    [accounts]
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Active Accounts Section */}
      <GlassCard>
        <SectionHeader
          id="active-accounts"
          title="Your Accounts"
          action={
            <Button onClick={handleOpenAccountForm} variant="primary" size="sm">
              <MdAdd className="mr-2" /> Add Account
            </Button>
          }
        />
        {loading ? (
          <div className="flex flex-col justify-center items-center h-40 py-6">
            <Spinner size="lg" color="primary" />
            <span className="mt-3 text-text-base dark:text-text-light">
              Loading accounts...
            </span>
          </div>
        ) : activeAccounts.length > 0 ? (
          <div className="space-y-4">
            {activeAccounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onEdit={handleEditAccount}
                onDelete={handleDeleteAccount}
                isDefault={account.id === settings?.defaultAccountId}
                onSetDefault={handleSetDefaultAccount}
              />
            ))}
          </div>
        ) : (
          <p className="text-text-base dark:text-text-light opacity-75">
            No active accounts. Add your first account!
          </p>
        )}
      </GlassCard>

      {/* Deactivated Accounts Section */}
      {deactivatedAccounts.length > 0 && (
        <GlassCard>
          <SectionHeader
            id="deactivated-accounts"
            title="Deactivated Accounts"
          />
          <div className="space-y-4">
            {deactivatedAccounts.map((account) => (
              <GlassCard
                key={account.id}
                className="opacity-70 border-dashed border-2 border-gray-300 dark:border-gray-600"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${getAccountColorClass(
                        account.color
                      )}`}
                    ></div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-base dark:text-text-light">
                        {account.name}
                      </h3>
                      <p className="text-sm text-text-light dark:text-text-dark">
                        Balance: {formatCurrency(account.balance || 0)}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleAccountActiveStatus(account)}
                    variant="outline"
                    size="sm"
                  >
                    Activate
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Account Form Modal */}
      <AccountForm
        isOpen={isAccountFormOpen}
        onClose={() => setIsAccountFormOpen(false)}
        accountToEdit={accountToEdit}
      />
    </div>
  );
};

export default Accounts;
