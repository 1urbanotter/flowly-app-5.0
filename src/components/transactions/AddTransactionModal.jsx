import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import Button from "../common/Button";
import { useData } from "../../context/DataContext";

const AddTransactionModal = ({ isOpen, onClose, transactionToEdit }) => {
  const { accounts, addTransaction, updateTransaction, settings, loading } =
    useData();
  const unitLabel = settings?.unitLabel || "units";

  const initialFormState = {
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    type: "Sale",
    customerVendor: "",
    accountId: "",
    moneyIn: "",
    moneyOut: "",
    units: "",
    notes: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transactionToEdit) {
      setForm({
        date: transactionToEdit.date?.toDate
          ? transactionToEdit.date.toDate().toISOString().split("T")[0]
          : transactionToEdit.date,
        type: transactionToEdit.type,
        customerVendor: transactionToEdit.customerVendor,
        accountId: transactionToEdit.accountId,
        moneyIn: transactionToEdit.moneyIn || "",
        moneyOut: transactionToEdit.moneyOut || "",
        units: transactionToEdit.units || "",
        notes: transactionToEdit.notes || "",
      });
    } else {
      setForm(initialFormState); // Reset form when modal opens for new transaction
      if (settings?.defaultAccountId) {
        setForm((prev) => ({ ...prev, accountId: settings.defaultAccountId }));
      }
    }
    setErrors({}); // Clear errors on modal open/edit
  }, [isOpen, transactionToEdit, accounts, settings]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Date is required";
    if (!form.type) newErrors.type = "Type is required";
    if (!form.accountId) newErrors.accountId = "Account is required";

    if (form.type === "Sale" || form.type === "Purchase") {
      if (
        form.units === "" ||
        isNaN(form.units) ||
        parseFloat(form.units) <= 0
      ) {
        newErrors.units = `Units (${unitLabel}) must be a positive number`;
      }
    }

    if (form.type === "Sale" || form.type === "Gift") {
      if (
        form.moneyIn !== "" &&
        (isNaN(form.moneyIn) || parseFloat(form.moneyIn) < 0)
      ) {
        newErrors.moneyIn = "Money In must be a non-negative number";
      }
    }

    if (form.type === "Purchase" || form.type === "Expense") {
      if (
        form.moneyOut !== "" &&
        (isNaN(form.moneyOut) || parseFloat(form.moneyOut) < 0)
      ) {
        newErrors.moneyOut = "Money Out must be a non-negative number";
      }
    }

    if (!form.moneyIn && !form.moneyOut) {
      newErrors.moneyIn = "Either Money In or Money Out is required.";
      newErrors.moneyOut = "Either Money In or Money Out is required.";
    } else if (form.moneyIn && form.moneyOut) {
      newErrors.moneyIn = "Cannot have both Money In and Money Out.";
      newErrors.moneyOut = "Cannot have both Money In and Money Out.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Convert money and units to numbers
    const processedForm = {
      ...form,
      moneyIn: form.moneyIn === "" ? 0 : parseFloat(form.moneyIn),
      moneyOut: form.moneyOut === "" ? 0 : parseFloat(form.moneyOut),
      units: form.units === "" ? 0 : parseFloat(form.units),
      date: new Date(form.date), // Convert date string back to Date object
    };

    let success = false;
    if (transactionToEdit) {
      success = await updateTransaction(transactionToEdit.id, processedForm);
    } else {
      success = await addTransaction(processedForm);
    }

    if (success) {
      onClose();
      setForm(initialFormState); // Reset form after successful submission
    }
  };

  const accountOptions = accounts.map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const transactionTypeOptions = [
    { value: "Sale", label: "Sale" },
    { value: "Purchase", label: "Purchase" },
    { value: "Expense", label: "Expense" },
    { value: "Gift", label: "Gift" },
  ];

  const showMoneyIn = form.type === "Sale" || form.type === "Gift";
  const showMoneyOut = form.type === "Purchase" || form.type === "Expense";
  const showUnits = form.type === "Sale" || form.type === "Purchase";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transactionToEdit ? "Edit Transaction" : "Add New Transaction"}
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Date"
          id="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          error={errors.date}
        />
        <SelectField
          label="Type"
          id="type"
          value={form.type}
          onChange={handleChange}
          options={transactionTypeOptions}
          required
          error={errors.type}
        />
        <InputField
          label="Customer/Vendor"
          id="customerVendor"
          value={form.customerVendor}
          onChange={handleChange}
          placeholder="e.g., John Doe / Supplier XYZ"
        />
        <SelectField
          label="Account"
          id="accountId"
          value={form.accountId}
          onChange={handleChange}
          options={[
            { value: "", label: "Select an account", disabled: true },
            ...accountOptions,
          ]}
          required
          error={errors.accountId}
          placeholder="Select an account"
        />

        {showMoneyIn && (
          <InputField
            label="Money In"
            id="moneyIn"
            type="number"
            value={form.moneyIn}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            error={errors.moneyIn}
          />
        )}
        {showMoneyOut && (
          <InputField
            label="Money Out"
            id="moneyOut"
            type="number"
            value={form.moneyOut}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            error={errors.moneyOut}
          />
        )}
        {showUnits && (
          <InputField
            label={`Units (${unitLabel})`}
            id="units"
            type="number"
            value={form.units}
            onChange={handleChange}
            placeholder={`e.g., 10 ${unitLabel}`}
            step="any"
            error={errors.units}
          />
        )}
        <InputField
          label="Notes"
          id="notes"
          type="textarea" // Not a real type but useful for semantic styling
          value={form.notes}
          onChange={handleChange}
          placeholder="Optional notes about the transaction..."
          className="min-h-[80px] max-h-[150px]"
        />

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading
              ? "Saving..."
              : transactionToEdit
              ? "Save Changes"
              : "Add Transaction"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;
