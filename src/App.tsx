import ToastProvider from "./components/Toast/ToastProvider";
import Home from "./pages/home";

export default function App() {
  return (
    <ToastProvider>
      <Home />
    </ToastProvider>
  );
}
