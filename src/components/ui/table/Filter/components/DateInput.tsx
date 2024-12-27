import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../../../DatePicker.css";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  isBetween?: boolean;
  onEndDateChange?: (date: Date | null) => void;
  endDate?: Date | null;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  isBetween = false,
  onEndDateChange,
  endDate
}) => {
  return (
    <div className="flex gap-2 items-center">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
      className="rounded-md border-gray-300 text-sm flex-1 min-w-[150px]"
      placeholderText="Sélectionner une date"
      />
      {isBetween && onEndDateChange && (
        <>
          <span className="text-sm text-gray-500">et</span>
          <DatePicker
            selected={endDate}
            onChange={onEndDateChange}
            dateFormat="dd/MM/yyyy"
      className="rounded-md border-gray-300 text-sm flex-1 min-w-[150px]"
      placeholderText="Sélectionner une date"
          />
        </>
      )}
    </div>
  );
};
