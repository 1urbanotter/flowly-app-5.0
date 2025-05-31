import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import AccountCard from "../components/accounts/AccountCard"; // Assumed to be updated
import AccountForm from "../components/accounts/AccountForm"; // Assumed to be updated
import Button from "../components/common/Button"; // Assumed to be updated
import { MdAdd } from "react-icons/md";
import Spinner from "../components/common/Spinner"; // Assumed to be updated
import toast from "react-hot-toast"; // External library, no styling changes here

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
    setAccountToEdit(null); // Ensure no account is being edited
    setIsAccountFormOpen(true);
  };

  const handleEditAccount = (account) => {
    setAccountToEdit(account);
    setIsAccountFormOpen(true);
  };

  const handleDeleteAccount = async (accountId) => {
    // Prevent deleting default account
    if (settings?.defaultAccountId === accountId) {
      toast.error(
        "Cannot delete the default account. Please set another account as default first."
      );
      return;
    }

    const success = await deleteAccount(accountId);
    if (success && settings?.defaultAccountId === accountId) {
      // If the deleted account was default, reset defaultAccountId in settings
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

  const activeAccounts = useMemo(
    () => accounts.filter((acc) => acc.isActive),
    [accounts]
  );
  const deactivatedAccounts = useMemo(
    () => accounts.filter((acc) => !acc.isActive),
    [accounts]
  );

  const toggleAccountActiveStatus = async (account) => {
    await updateAccount(account.id, { isActive: !account.isActive });
    toast.success(
      `Account ${account.name} has been ${
        account.isActive ? "deactivated" : "activated"
      }.`
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-text-base dark:text-text-dark mb-6">
        {" "}
        {/* Updated text colors */}
        Accounts
      </h1>

      <div className="container-base mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-base dark:text-text-dark">
            {" "}
            {/* Updated text colors */}
            Your Accounts
          </h2>
          <Button
            onClick={handleOpenAccountForm}
            variant="primary"
            className="text-sm" // Removed explicit px-3 py-1.5, relying on Button component's internal padding
          >
            <MdAdd size={20} className="mr-1" /> Add Account
          </Button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Spinner />
            <span className="ml-2 text-text-base dark:text-text-dark">
              {" "}
              {/* Updated text colors */}
              Loading accounts...
            </span>
          </div>
        ) : activeAccounts.length > 0 ? (
          <div>
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
          <p className="text-text-light dark:text-text-darker">
            {" "}
            {/* Updated text colors */}
            No active accounts. Add your first account!
          </p>
        )}
      </div>

      {deactivatedAccounts.length > 0 && (
        <div className="container-base mt-8">
          <h2 className="text-xl font-semibold text-text-base dark:text-text-dark mb-4">
            {" "}
            {/* Updated text colors */}
            Deactivated Accounts
          </h2>
          {deactivatedAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between container-base mb-4 opacity-70"
            >
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${getAccountColorClass(
                    account.color
                  )}`}
                ></div>
                <div>
                  <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                    {" "}
                    {/* Updated text colors */}
                    {account.name}
                  </h3>
                  <p className="text-sm text-text-light dark:text-text-darker">
                    {" "}
                    {/* Updated text colors */}
                    Balance:{" "}
                    <span className="font-bold text-primary-DEFAULT">
                      {" "}
                      {/* Added primary-DEFAULT color */}
                      {formatCurrency(account.balance || 0)}
                    </span>
                  </p>
                </div>
              </div>
              <Button
                onClick={() => toggleAccountActiveStatus(account)}
                variant="outline"
                className="text-sm"
              >
                Activate
              </Button>
            </div>
          ))}
        </div>
      )}

      <AccountForm
        isOpen={isAccountFormOpen}
        onClose={() => setIsAccountFormOpen(false)}
        accountToEdit={accountToEdit}
      />
    </div>
  );
};

export default Accounts;
