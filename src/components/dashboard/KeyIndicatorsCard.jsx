import React from "react";
import { useData } from "../../context/DataContext";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../common/Spinner";
import { MdAttachMoney, MdStorage } from "react-icons/md";

const KeyIndicatorsCard = () => {
  const { dollarsToUnitsRatio, totalUnitsInStock, settings, loading } =
    useData();
  const unitLabel = settings?.unitLabel || "units";

  if (loading) {
    return (
      <div className="bg-background-base/30 dark:bg-background-dark/30 p-4 rounded-lg shadow-glass-light dark:shadow-glass-dark flex flex-col justify-center items-center py-6 text-center backdrop-blur-md border border-primary-light/10">
        <Spinner size="md" color="primary" />
        <span className="mt-3 text-base font-sans text-text-base dark:text-text-light opacity-75">
          Loading key indicators...
        </span>
      </div>
    );
  }

  const StatItem = ({ icon, title, value, description }) => (
    <div className="bg-background-base/30 dark:bg-background-dark/30 p-4 rounded-lg shadow-glass-light dark:shadow-glass-dark backdrop-blur-md border border-primary-light/10 flex items-center">
      <div className="mr-3 p-2 rounded-md bg-primary-light/20 flex items-center justify-center">
        {React.cloneElement(icon, {
          className: "h-8 w-8 text-primary-light",
        })}
      </div>
      <div className="flex-grow">
        <p className="text-xl border-b-2 border-primary-light pb-2 mb-2 font-bold text-text-base">
          {title}
        </p>
        <p className="text-3xl font-mono text-primary-light">{value}</p>
        {description && (
          <p className="text-md text-text-dark mt-1">{description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatItem
        icon={<MdAttachMoney />}
        title={`Value per ${unitLabel}`}
        value={`${formatCurrency(dollarsToUnitsRatio)} / ${unitLabel}`}
        description="Average revenue generated per unit"
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
