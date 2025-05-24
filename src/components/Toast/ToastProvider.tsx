import { createContext, useContext, useState, type ReactNode } from "react";
import type { ShowToastMessage, ToastItem, ToastPosition } from "./types";
import { v4 as uuid } from "uuid";
import { createPortal } from "react-dom";
import Toast from "./Toast";

interface IToastContext {
  showToastMessage: ShowToastMessage;
}

const ToastContext = createContext<IToastContext | null>(null);

export function useToast(): IToastContext {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToastMessage: ShowToastMessage = (
    message,
    { status = "success", position = "top-right", delay = 3000 } = {}
  ) => {
    const id = uuid();
    const toast: ToastItem = { id, message, status, position, delay };
    setToasts((prev) => [...prev, toast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const positionGroups = toasts.reduce<Record<ToastPosition, ToastItem[]>>(
    (acc, toast) => {
      if (!acc[toast.position]) {
        acc[toast.position] = [];
      }
      acc[toast.position].push(toast);
      return acc;
    },
    {
      "top-left": [],
      "top-center": [],
      "top-right": [],
      "bottom-left": [],
      "bottom-center": [],
      "bottom-right": [],
    }
  );

  return (
    <ToastContext.Provider value={{ showToastMessage }}>
      {children}
      {Object.entries(positionGroups).map(([position, group]) =>
        createPortal(
          <div className={`toast-container ${position}`}>
            {group.map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </div>,
          document.body
        )
      )}
    </ToastContext.Provider>
  );
}
