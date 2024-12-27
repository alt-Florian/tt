interface BooleanInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function BooleanInput({ value, onChange }: BooleanInputProps) {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
    />
  );
}
