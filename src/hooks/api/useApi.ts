import { useAuthStore } from "@stores/Auth.store";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export function useApi() {
  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { Version: "2" },
  });

  api.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    const token =
      useAuthStore.getState()?.token ?? localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  });

  api.interceptors.response.use(
    // Gestion des success
    (response: AxiosResponse) => response,
    // Gestion des erreurs
    async (error: any) => {
      const originalRequest = error.config;
      // S'il s'agit d'une erreur 401
      if (error.response?.status === 401) {
        // Vérifie que la requête n'a pas déjà été réessayée
        if (originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;
          // Tente de renouveler les tokens avec le refreshToken du AuthStore (ou du localStorage en dev)
          const refreshToken =
            useAuthStore.getState()?.refreshToken ??
            localStorage.getItem("refreshToken");
          const { setAuthState } = useAuthStore.getState();
          //
          if (refreshToken) {
            try {
              const { data } = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}auth/refreshToken`,
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                    Version: "2",
                  },
                }
              );
              // Met à jour le state et le local storage avec les nouveaux tokens
              setAuthState({
                token: data.datas.token,
                refreshToken: data.datas.refreshToken,
                user: data.datas.user,
                filters: data.datas.filters,
              });
              // Stockage non sécurisé dans le local storage pour le dev (à modifier)
              localStorage.setItem("token", data.datas.token);
              localStorage.setItem("refreshToken", data.datas.refreshToken);
              // Met à jour le token dans l'en-tête de la requête initiale
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${data.datas.token}`;
              // Réessaie la requête initiale
              return axios(originalRequest);
            } catch (error) {
              console.log(error);
              // Redirige vers le login si la régénération des tokens échoue
              location.href = "/signin";
            }
          } else {
            // Redirige vers le login si aucun refreshToken n'est disponible
            location.href = "/signin";
          }
        }
      }
      // S'il s'agit d'une erreur 500
      if (error.response?.status === 500) {
        console.error("Erreur interne du serveur:", error.response.data);
      }
      // Retourne une promesse rejetée pour toute autre erreur
      return Promise.reject(error);
    }
  );

  return api;
}
