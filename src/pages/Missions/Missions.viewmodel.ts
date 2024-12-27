import { useState } from "react";
import { MISSION_COLUMNS } from "./constants/missionColumns";
import { FILTER_FIELDS } from './constants/missionFilters';
import { missionService } from "@services/Mission.service";
import { useSearchParams } from "react-router-dom";
export function useMissionsViewModel() {


  const [searchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip")) || 0;

  const { data, isLoading, error } = missionService.get(skip);


  const handleSearch = (query: string) => {
    // Implement search logic
    console.log("Searching:", query);
  };

  const handleFilter = (filters: any) => {
    // Implement filter logic
    console.log("Applying filters:", filters);
  };




  // console.log("🚀 ~ useMissionsViewModel ~ users:", users)
  const [columns] = useState(MISSION_COLUMNS);
  const [filters] = useState(FILTER_FIELDS);
  return {
    data,
    columns,
    filters,
    handleSearch,
    handleFilter,
    skip,
    isLoading,
    error
  };
}

