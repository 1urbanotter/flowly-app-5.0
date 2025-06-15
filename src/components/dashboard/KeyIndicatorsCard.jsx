import React from "react";
import { useData } from "../../context/DataContext";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../common/Spinner";
import GlassCard from "../common/GlassCard";
import { MdAttachMoney, MdStorage } from "react-icons/md";

const KeyIndicatorsCard = () => {
  const { dollarsToUnitsRatio, totalUnitsInStock, settings, loading } =
    useData();
  const unitLabel = settings?.unitLabel || "units";

  if (loading) {
    return (
      <GlassCard className="flex flex-col justify-center items-center py-6">
        <Spinner size="md" color="primary" />
        <span className="mt-3 text-text-base dark:text-text-light">
          Loading key indicators...
        </span>
      </GlassCard>
    );
  }

  const StatItem = ({ icon, title, value, description }) => (
    <GlassCard className="flex items-center">
      <div className="mr-3 p-2 rounded-md bg-primary-light/20 dark:bg-secondary-light/20">
        {React.cloneElement(icon, {
          className: "h-6 w-6 text-primary-light dark:text-secondary-light",
        })}
      </div>
      <div className="flex-grow">
        <p className="text-lg font-semibold text-text-base dark:text-text-light font-mono">
          {title}
        </p>
        <p className="text-xl font-mono text-primary-light dark:text-secondary-light">
          {value}
        </p>
        {description && (
          <p className="text-sm text-text-base dark:text-text-dark mt-1">
            {description}
          </p>
        )}
      </div>
    </GlassCard>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatItem
        icon={<MdAttachMoney />}
        title={`Value per ${unitLabel}`}
        value={`${formatCurrency(dollarsToUnitsRatio)} / ${unitLabel}`}
        description="Average revenue per unit"
      />
      <StatItem
        icon={<MdStorage />}
        title="Total Units in Stock"
        value={`${totalUnitsInStock} ${unitLabel}`}
        description="Current quantity of available products"
      />
    </div>
  );
};

export default KeyIndicatorsCard;
