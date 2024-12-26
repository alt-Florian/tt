import { useState } from "react";
import { useMissionsData } from "./hooks/useMissionsData";
import { MISSION_COLUMNS } from "./constants/missionColumns";

export function useMissionsViewModel() {
  const { data, isLoading, error } = useMissionsData();
  const [columns] = useState(MISSION_COLUMNS);

  const handleSearch = (query: string) => {
    // Implement search logic
    console.log("Searching:", query);
  };

  const handleFilter = (filters: any) => {
    // Implement filter logic
    console.log("Applying filters:", filters);
  };

  return {
    data,
    columns,
    handleSearch,
    handleFilter,
    isLoading,
    error
  };
}