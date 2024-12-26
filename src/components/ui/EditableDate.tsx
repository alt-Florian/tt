import dayjs from "dayjs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

interface EditableDateProps {
  date: Date;
  onUpdate: (date: Date | null) => void;
  className?: string;
  classNameDate?: string;
}
const EditableDate = ({
  date,
  onUpdate,
  className,
  classNameDate,
}: EditableDateProps) => {
  const [dateSelected, setDateSelected] = useState<Date | null>(date);
  const [isEditing, setIsEditing] = useState(false);

  // Active le mode édition
  const handleDateClick = () => setIsEditing(true);

  return (
    <div className={className}>
      {isEditing ? (
        <DatePicker
          open
          selected={dateSelected}
          onChange={(date) => {
            setDateSelected(date);
            onUpdate(date);
            setIsEditing(false);
          }}
          onClickOutside={() => setIsEditing(false)}
          dateFormat="dd/MM/yyyy"
        />
      ) : (
        <span onClick={handleDateClick} className={`p-0 ${classNameDate}`}>
          {dayjs(dateSelected).format("DD/MM/YYYY")}
        </span>
      )}
    </div>
  );
};

export default EditableDate;
