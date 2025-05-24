export type ToastStatus = "success" | "warning" | "error";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastOptions {
  status?: ToastStatus;
  position?: ToastPosition;
  delay?: number | null;
}

export type ShowToastMessage = (
  message: string,
  options?: ToastOptions
) => void;

export interface ToastItem {
  id: string;
  message: string;
  status: ToastStatus;
  position: ToastPosition;
  delay: number | null;
}
