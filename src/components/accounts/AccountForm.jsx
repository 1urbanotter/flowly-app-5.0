import React, { useState, useEffect } from "react";
import InputField from "../common/InputField"; // Assumed to be updated
import SelectField from "../common/SelectField"; // Assumed to be updated
import Button from "../common/Button"; // Assumed to be updated
import Modal from "../common/Modal"; // Assumed to be updated
import { useData } from "../../context/DataContext";

const AccountForm = ({ isOpen, onClose, accountToEdit }) => {
  const { addAccount, updateAccount, loading } = useData();
  const [form, setForm] = useState({
    name: "",
    balance: "",
    color: "blue", // Default color
    isActive: true, // Default to active
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (accountToEdit) {
      setForm({
        name: accountToEdit.name,
        balance: accountToEdit.balance || "",
        color: accountToEdit.color || "blue",
        isActive:
          accountToEdit.isActive !== undefined ? accountToEdit.isActive : true,
      });
    } else {
      setForm({
        name: "",
        balance: "",
        color: "blue",
        isActive: true,
      });
    }
    setErrors({}); // Clear errors on modal open/edit
  }, [isOpen, accountToEdit]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Account name is required.";
    if (form.balance === "" || isNaN(form.balance))
      newErrors.balance = "Balance must be a number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const processedForm = {
      ...form,
      balance: parseFloat(form.balance),
    };

    let success = false;
    if (accountToEdit) {
      success = await updateAccount(accountToEdit.id, processedForm);
    } else {
      success = await addAccount(processedForm);
    }

    if (success) {
      onClose();
      setForm({ name: "", balance: "", color: "blue", isActive: true }); // Reset form
    }
  };

  const colorOptions = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
    { value: "indigo", label: "Indigo" },
    { value: "pink", label: "Pink" },
    { value: "gray", label: "Gray" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={accountToEdit ? "Edit Account" : "Add New Account"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        {/* Added space-y for consistent spacing */}
        <InputField
          label="Account Name"
          id="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g., Checking, Savings, Cash"
          required
          error={errors.name}
        />
        <InputField
          label="Initial Balance"
          id="balance"
          type="number"
          value={form.balance}
          onChange={handleChange}
          placeholder="0.00"
          step="0.01"
          required
          error={errors.balance}
        />
        <SelectField
          label="Color Indicator"
          id="color"
          value={form.color}
          onChange={handleChange}
          options={colorOptions}
        />
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-primary-DEFAULT rounded border-gray-300 focus:ring-primary-light focus:ring-opacity-50 dark:bg-background-dark dark:border-gray-600" // Updated checked color, focus ring, dark background
          />
          <label
            htmlFor="isActive"
            className="ml-2 block text-sm text-text-light dark:text-text-dark" // Updated label text colors
          >
            Active Account
          </label>
        </div>
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
              : accountToEdit
              ? "Save Changes"
              : "Add Account"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AccountForm;
