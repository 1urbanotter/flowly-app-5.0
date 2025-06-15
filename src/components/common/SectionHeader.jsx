import React from "react";

const SectionHeader = ({ id, title, action }) => (
  <div className="flex justify-between items-center mb-4 sm:mb-6">
    <h1
      id={id}
      className="text-3xl font-bold text-primary-light dark:text-secondary-light font-sans tracking-wide"
    >
      {title.toUpperCase()}
    </h1>
    {action}
  </div>
);

export default SectionHeader;
