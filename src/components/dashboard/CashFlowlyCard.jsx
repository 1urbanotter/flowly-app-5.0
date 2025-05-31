import React from "react";
import { useData } from "../../context/DataContext";
import { formatCurrency, getMoneyFlowColor } from "../../utils/helpers";
import Spinner from "../common/Spinner";
import { PiFlowArrowBold } from "react-icons/pi";

const CashFlowlyCard = () => {
  const {
    netCashFlowOverall,
    netCashFlowDaily,
    netCashFlowWeekly,
    netCashFlowMonthly,
    loading,
  } = useData();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-6 text-center">
        <Spinner size="md" color="primary" />
        <span className="mt-3 text-sm font-inter text-text-base dark:text-text-dark opacity-75">
          Loading cash flow...
        </span>
      </div>
    );
  }

  const cashFlowMetrics = [
    { label: "Overall", value: netCashFlowOverall },
    { label: "Monthly", value: netCashFlowMonthly },
    { label: "Weekly", value: netCashFlowWeekly },
    { label: "Daily", value: netCashFlowDaily },
  ];

  const FlowItem = ({ label, value }) => (
    <div className="bg-background-base dark:bg-background-darker p-4 rounded-lg shadow-custom-light dark:shadow-custom-dark flex items-center">
      <div className="mr-3 p-2 rounded-md bg-primary-light dark:bg-secondary-dark flex items-center justify-center">
        <PiFlowArrowBold className="h-8 w-8 text-primary-dark dark:text-primary-dark" />
      </div>
      <div className="flex-grow">
        <p className="text-xl border-b-2 border-primary dark:border-secondary-dark pb-2 mb-2 font-bold text-text-darker dark:text-text-light">
          {label} Flow
        </p>
        <p className="text-2xl font-mono text-primary dark:text-primary-light">
          {formatCurrency(value)}
        </p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cashFlowMetrics.map((metric, index) => (
        <FlowItem key={index} label={metric.label} value={metric.value} />
      ))}
    </div>
  );
};

export default CashFlowlyCard;
