import { useEffect, useRef, useState } from "react";
import type { ToastStatus } from "./types";

interface Props {
  message: string;
  status: ToastStatus;
  delay: number | null;
  onClose: () => void;
}

export default function Toast({ message, delay, onClose, status }: Props) {
  const [percent, setPercent] = useState(100);
  const [paused, setPaused] = useState(false);
  const startTimeRef = useRef(Date.now());
  const animationRef = useRef<number | null>(null);

  const handleMouseLeave = () => {
    if (delay === null) return;

    const elapsed = delay * (1 - percent / 100);
    startTimeRef.current = Date.now() - elapsed;
    setPaused(false);
  };

  // Toast Auto Close
  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = delay - elapsed;

      if (remaining <= 0) {
        onClose();
      } else {
        setPercent((remaining / delay) * 100);
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    if (!paused) {
      animationRef.current = requestAnimationFrame(tick);
    }

    return () => {
      // useEffect 재실행마다, 진행 중인 애니메이션 프레임 취소
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [delay, paused, onClose]);

  return (
    <div
      className={`toast ${status}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast-message">{message}</div>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      {delay !== null && (
        <div className="progress" style={{ width: `${percent}%` }} />
      )}
    </div>
  );
}
