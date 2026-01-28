import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  isMulti?: boolean;
  className?: string;
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderColor: state.isFocused ? "#ef4444" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(239, 68, 68, 0.2)" : "none",
    "&:hover": {
      borderColor: "#ef4444",
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#ef4444"
      : state.isFocused
        ? "#fee2e2"
        : "white",
    "&:active": {
      backgroundColor: "#ef4444",
    },
  }),
};

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isMulti = false,
  className = "",
}: SearchableSelectProps) {
  const handleChange = (selected: Option | MultiValue<Option> | null) => {
    if (isMulti) {
      const values = (selected as MultiValue<Option>).map(
        (opt: Option) => opt.value,
      );
      onChange(values);
    } else {
      onChange((selected as Option)?.value || "");
    }
  };

  const selectedValue = isMulti
    ? options.filter((opt) => (value as string[]).includes(opt.value))
    : options.find((opt) => opt.value === value) || null;

  return (
    <Select
      className={className}
      options={options}
      value={selectedValue}
      onChange={handleChange}
      placeholder={placeholder}
      isMulti={isMulti}
      styles={customStyles}
      isClearable
      isSearchable
    />
  );
}
