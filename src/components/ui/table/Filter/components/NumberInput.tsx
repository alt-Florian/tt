import { useState } from 'react';

interface NumberInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  isBetween?: boolean;
  onEndValueChange?: (value: number | null) => void;
  endValue?: number | null;
}

export function NumberInput({
  value,
  onChange,
  isBetween = false,
  onEndValueChange,
  endValue
}: NumberInputProps) {
  const [startStr, setStartStr] = useState(value?.toString() || '');
  const [endStr, setEndStr] = useState(endValue?.toString() || '');

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStartStr(val);
    onChange(val === '' ? null : Number(val));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onEndValueChange) return;
    const val = e.target.value;
    setEndStr(val);
    onEndValueChange(val === '' ? null : Number(val));
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="number"
        value={startStr}
        onChange={handleStartChange}
        className="rounded-md border-gray-300 text-sm flex-1 min-w-[100px]"
        placeholder="Valeur"
      />
      {isBetween && onEndValueChange && (
        <>
          <span className="text-sm text-gray-500">et</span>
          <input
            type="number"
            value={endStr}
            onChange={handleEndChange}
            className="rounded-md border-gray-300 text-sm flex-1 min-w-[100px]"
            placeholder="Valeur"
          />
        </>
      )}
    </div>
  );
}