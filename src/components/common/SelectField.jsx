import React from "react";

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  className = "",
  required = false,
  error,
  placeholder,
}) => {
  return (
    <div className="mb-lg">
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-bold text-text-base mb-sm font-sans"
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`block w-full p-md rounded-xl shadow-glass-light dark:shadow-glass-dark bg-background-base dark:bg-background-dark text-text-base font-sans border ${
          error ? "border-danger" : "border-primary-light/20"
        } focus:border-primary-light focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=%27%2300DDEB%27 height=%2724%27 viewBox=%270 0 24 24%27 width=%2724%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27M7 10l5 5 5-5z%27/><path d=%27M0 0h24v24H0z%27 fill=%27none%27/></svg>')] bg-no-repeat bg-[right_0.5rem_center] pr-xl ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-sm text-sm text-danger font-sans">{error}</p>}
    </div>
  );
};

export default SelectField;
