import { useAuthStore } from "@/shared/store/auth";

export const getFileById = (fileId: string) => {
  const authStore = useAuthStore();
  return `${import.meta.env.VITE_API_SERVER}File/FileById?id=${fileId}&sessionId=${authStore.getSessionId}`;
};

export const getFullIcon = (iconPath: string) => {
  return `data:image/png;base64,${iconPath}`
}
