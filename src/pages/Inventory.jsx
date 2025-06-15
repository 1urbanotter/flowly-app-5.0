import React, { useMemo } from "react";
import { useData } from "../context/DataContext";
import Spinner from "../components/common/Spinner";
import { formatCurrency } from "../utils/helpers";

const Inventory = () => {
  const {
    transactions,
    totalUnitsInStock,
    dollarsToUnitsRatio,
    settings,
    loading,
  } = useData();
  const unitLabel = settings?.unitLabel || "units";

  // Calculate units per transaction type (for a breakdown)
  const unitsBreakdown = useMemo(() => {
    const breakdown = {
      sales: 0,
      purchases: 0,
      gifts: 0,
    };
    transactions.forEach((t) => {
      if (t.type === "Sale") breakdown.sales += t.units || 0;
      else if (t.type === "Purchase") breakdown.purchases += t.units || 0;
      else if (t.type === "Gift") breakdown.gifts += t.units || 0;
    });
    return breakdown;
  }, [transactions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen-minus-nav">
        <Spinner />{" "}
        <span className="ml-2 text-text-darker dark:text-text-darker">
          Loading inventory data...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-4xl font-mono font-bold text-text-base dark:text-text-base mb-6">
        INVENTORY
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="container-base">
          <h2 className="text-2xl font-mono font-semibold border-b border-secondary/30 text-secondary-light dark:text-primary-light mb-4">
            CURRENT STOCK
          </h2>
          <div className="flex items-center justify-between py-2 border-b border-primary/30 dark:border-primary/30 last:border-b-0">
            <span className="text-lg font-medium text-secondary dark:text-primary">
              Total {unitLabel} in Stock:
            </span>
            <span className="text-2xl font-bold text-primary-light dark:text-secondary-light">
              {totalUnitsInStock} {unitLabel}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <span className="text-lg font-medium text-secondary dark:text-primary">
              Dollars per {unitLabel} Ratio:
            </span>
            <span className="text-2xl font-bold text-primary-light dark:text-secondary-light">
              {formatCurrency(dollarsToUnitsRatio)}/{unitLabel}
            </span>
          </div>
        </div>

        <div className="container-base">
          <h2 className="text-2xl font-mono font-semibold border-b border-secondary/30 text-secondary-light dark:text-primary-light mb-4">
            BREAKDOWN
          </h2>
          <div className="py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-primary text-lg">
                Units Purchased:
              </span>
              <span className="font-semibold text-primary-light dark:text-secondary-light">
                {unitsBreakdown.purchases} {unitLabel}
              </span>
            </div>
            <p className="text-sm text-base">
              Total units acquired through purchases.
            </p>
          </div>
          <div className="py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-primary text-lg">
                Units Sold:
              </span>
              <span className="font-semibold text-primary-light dark:text-secondary-light">
                {unitsBreakdown.sales} {unitLabel}
              </span>
            </div>
            <p className="text-sm text-base">
              Total units moved out through sales.
            </p>
          </div>
          <div className="py-2">
            <div className="flex justify-between items-center">
              <span className="text-secondary dark:text-primary text-lg">
                Units Gifted:
              </span>
              <span className="font-semibold text-primary-light dark:text-secondary-light">
                {unitsBreakdown.gifts} {unitLabel}
              </span>
            </div>
            <p className="text-sm text-base">Units given away as gifts.</p>
          </div>
        </div>
      </div>

      <div className="container-base">
        <h2 className="text-2xl font-mono font-semibold border-b border-secondary/30 text-secondary-light dark:text-primary-light mb-4">
          NOTES
        </h2>
        <p className="text-base">
          This page provides an overview of your product units. The "Total Units
          in Stock" is calculated by subtracting units from Sales and adding
          units from Purchases. Expenses and Gifts do not directly impact the
          calculated stock. For more detailed inventory management, consider
          adding specific product SKUs in the future.
        </p>
      </div>
    </div>
  );
};

export default Inventory;
