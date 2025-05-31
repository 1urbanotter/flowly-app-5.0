import React from "react";
import { useData } from "../context/DataContext";
import { formatCurrency } from "../utils/helpers";
// FIX: Added MdAccountBalanceWallet to the import list
import {
  MdAttachMoney,
  MdShowChart,
  MdStorage,
  MdTrendingUp,
  MdAccountBalanceWallet,
} from "react-icons/md";
import Spinner from "./common/Spinner";

const DashboardMetrics = () => {
  const {
    dollarsToUnitsRatio,
    totalUnitsInStock,
    totalCashBalance,
    netCashFlowOverall,
    netCashFlowDaily,
    netCashFlowWeekly,
    netCashFlowMonthly,
    settings,
    loading,
  } = useData();

  const unitLabel = settings?.unitLabel || "units";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 container-base">
        <Spinner /> <span className="ml-2">Loading metrics...</span>
      </div>
    );
  }

  const metrics = [
    {
      title: `Dollars per ${unitLabel} Ratio`,
      value: `${formatCurrency(dollarsToUnitsRatio)}/${unitLabel}`,
      icon: MdAttachMoney,
      color: "text-success",
      description: "Revenue generated per unit of product.",
    },
    {
      title: "Total Units in Stock",
      value: `${totalUnitsInStock} ${unitLabel}`,
      icon: MdStorage,
      color: "text-blue-500",
      description: "Current quantity of available products.",
    },
    {
      title: "Total Cash Balance",
      value: formatCurrency(totalCashBalance),
      icon: MdAccountBalanceWallet, // This is where the icon is used
      color: totalCashBalance >= 0 ? "text-success" : "text-danger",
      description: "Overall cash available across all accounts.",
    },
    {
      title: "Net Cash Flow (Overall)",
      value: formatCurrency(netCashFlowOverall),
      icon: MdShowChart,
      color: netCashFlowOverall >= 0 ? "text-success" : "text-danger",
      description: "Total cash movement (inflow - outflow).",
    },
    {
      title: "Net Cash Flow (Daily)",
      value: formatCurrency(netCashFlowDaily),
      icon: MdTrendingUp,
      color: netCashFlowDaily >= 0 ? "text-success" : "text-danger",
      description: "Cash flow today.",
    },
    {
      title: "Net Cash Flow (Weekly)",
      value: formatCurrency(netCashFlowWeekly),
      icon: MdTrendingUp,
      color: netCashFlowWeekly >= 0 ? "text-success" : "text-danger",
      description: "Cash flow over the last 7 days.",
    },
    {
      title: "Net Cash Flow (Monthly)",
      value: formatCurrency(netCashFlowMonthly),
      icon: MdTrendingUp,
      color: netCashFlowMonthly >= 0 ? "text-success" : "text-danger",
      description: "Cash flow for the current month.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="container-base flex items-center p-4">
          <div
            className={`mr-4 p-3 rounded-full ${metric.color.replace(
              "text-",
              "bg-"
            )} bg-opacity-10`}
          >
            <metric.icon size={28} className={metric.color} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {metric.title}
            </p>
            <p className={`text-2xl font-bold ${metric.color}`}>
              {metric.value}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {metric.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
