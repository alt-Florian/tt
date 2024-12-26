import { useQuery } from "@tanstack/react-query";
import { Mission } from "../types/mission.types";

// Temporary mock data - Replace with actual API call
const fetchMissions = async (): Promise<Mission[]> => {
  return [
    {
      id: 1,
      name: "Lettre de mission",
      responsible: "Mathieu Perret",
      template: "Mission standard avec un nom potentiellement super long",
      status: "Accepté",
      urgent: true
    },
    // Add more mock data as needed
  ];
};

export function useMissionsData() {
  return useQuery({
    queryKey: ['missions'],
    queryFn: fetchMissions
  });
}