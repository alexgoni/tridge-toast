import ToastProvider from "./components/Toast/ToastProvider";
import Home from "./pages/home";
import "./components/Toast/toast.css";

export default function App() {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}
