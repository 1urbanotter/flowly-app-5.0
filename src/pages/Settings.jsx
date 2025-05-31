import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import toast from "react-hot-toast";

const Settings = () => {
  const {
    settings,
    updateSettings,
    accounts,
    loading: dataLoading,
  } = useData();
  const [unitLabel, setUnitLabel] = useState("");
  const [defaultAccountId, setDefaultAccountId] = useState("");
  const [themePreference, setThemePreference] = useState("");
  const [formLoading, setFormLoading] = useState(false); // Local loading state for form submission

  useEffect(() => {
    if (settings && !dataLoading) {
      setUnitLabel(settings.unitLabel || "units");
      setDefaultAccountId(settings.defaultAccountId || "");
      setThemePreference(settings.theme || "system");
    }
  }, [settings, dataLoading]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const success = await updateSettings({
        unitLabel,
        defaultAccountId: defaultAccountId === "" ? null : defaultAccountId, // Store null if empty
        theme: themePreference,
      });
      if (success) {
        toast.success("Settings saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error(`Failed to save settings: ${error.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const accountOptions = [
    { value: "", label: "None" }, // Option to clear default account
    ...accounts.map((account) => ({
      value: account.id,
      label: account.name,
    })),
  ];

  const themeOptions = [
    { value: "system", label: "System Preference" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  if (dataLoading) {
    return (
      <div className="flex justify-center items-center h-screen-minus-nav">
        <Spinner />{" "}
        <span className="ml-2 text-text-dark dark:text-text-darker">
          Loading settings...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-text-light dark:text-text-darker mb-6">
        Settings
      </h1>

      <div className="container-base">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-darker mb-4">
          General Settings
        </h2>
        <form onSubmit={handleSaveSettings}>
          <InputField
            label="Unit Label"
            id="unitLabel"
            value={unitLabel}
            onChange={(e) => setUnitLabel(e.target.value)}
            placeholder="e.g., grams, items, pieces"
            required
          />
          <SelectField
            label="Default Account for New Transactions"
            id="defaultAccountId"
            value={defaultAccountId}
            onChange={(e) => setDefaultAccountId(e.target.value)}
            options={accountOptions}
          />
          <SelectField
            label="Theme Preference"
            id="themePreference"
            value={themePreference}
            onChange={(e) => setThemePreference(e.target.value)}
            options={themeOptions}
          />

          <div className="flex justify-end mt-6">
            <Button type="submit" variant="primary" disabled={formLoading}>
              {formLoading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </div>

      {/* Future sections like User Roles, Notifications, etc. */}
    </div>
  );
};

export default Settings;
