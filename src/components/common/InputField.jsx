import React from "react";

const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
  error,
}) => {
  const isTextArea = type === "textarea";
  const InputComponent = isTextArea ? "textarea" : "input";

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
      <InputComponent
        type={type === "textarea" ? undefined : type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`block w-full rounded-xl shadow-glass-light dark:shadow-glass-dark bg-background-base dark:bg-background-dark text-text-base font-sans border ${
          error ? "border-danger" : "border-primary-light/20"
        } ${
          isTextArea ? "p-md px-lg" : "p-md"
        } focus:border-primary-light focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-base transition-all-ease duration-fast ${className}`}
      />
      {error && <p className="mt-sm text-sm text-danger font-sans">{error}</p>}
    </div>
  );
};

export default InputField;
