import React from "react";
import { useData } from "../../context/DataContext";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../common/Spinner";
import GlassCard from "../common/GlassCard";
import { PiAlienFill } from "react-icons/pi";

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
      <GlassCard className="flex flex-col justify-center items-center py-6">
        <Spinner size="md" color="primary" />
        <span className="mt-3 text-text-base dark:text-text-light">
          Loading cash flow...
        </span>
      </GlassCard>
    );
  }

  const cashFlowMetrics = [
    { label: "Overall", value: netCashFlowOverall },
    { label: "Monthly", value: netCashFlowMonthly },
    { label: "Weekly", value: netCashFlowWeekly },
    { label: "Daily", value: netCashFlowDaily },
  ];

  const FlowItem = ({ label, value }) => (
    <GlassCard className="flex items-center">
      <div className="mr-3 p-2 rounded-md bg-primary-light/20 dark:bg-secondary-light/20">
        <PiAlienFill className="h-6 w-6 text-primary-light dark:text-secondary-light" />
      </div>
      <div className="flex-grow">
        <p className="text-lg font-semibold text-text-base dark:text-text-light font-mono">
          {label} Flow
        </p>
        <p className="text-xl font-mono text-primary-light dark:text-secondary-light">
          {formatCurrency(value)}
        </p>
      </div>
    </GlassCard>
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
