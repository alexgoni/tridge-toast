import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useState, type ChangeEvent } from "react";
import type { ToastPosition, ToastStatus } from "../components/Toast/types";
import { useToast } from "../components/Toast/ToastProvider";

const TOAST_POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;
const TOAST_STATUS = ["success", "warning", "error"] as const;

const cx = classNames.bind(styles);

export default function Home() {
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [status, setStatus] = useState<ToastStatus>("success");
  const [delay, setDelay] = useState<number | null>(3000);
  const [lastValidDelay, setLastValidDelay] = useState(3000);
  const [isDelayNull, setIsDelayNull] = useState(false);
  const [message, setMessage] = useState("Toast Message");
  const { showToastMessage, clearAll } = useToast();

  const handleDelayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLastValidDelay(value);
    if (!isDelayNull) {
      setDelay(value);
    }
  };

  const handleDelayNullToggle = () => {
    if (isDelayNull) {
      setDelay(lastValidDelay);
    } else {
      setDelay(null);
    }
    setIsDelayNull((prev) => !prev);
  };

  return (
    <>
      <header className={cx("header")}>Tridge Toast</header>

      <div className={cx("options-wrapper")}>
        <h1>Options</h1>
        <div className={cx("controls-wrapper")}>
          <div className={cx("controls")}>
            <div className={cx("option")}>
              <div className={cx("option-title")}>Position</div>
              <div className={cx("radio-group")}>
                {TOAST_POSITIONS.map((each) => (
                  <label key={each}>
                    <input
                      type="radio"
                      name="position"
                      value={each}
                      checked={position === each}
                      onChange={(e) =>
                        setPosition(e.target.value as ToastPosition)
                      }
                    />{" "}
                    {each}
                  </label>
                ))}
              </div>
            </div>

            <div className={cx("option")}>
              <div className={cx("option-title")}>Status</div>
              <div className={cx("radio-group")}>
                {TOAST_STATUS.map((each) => (
                  <label key={each}>
                    <input
                      type="radio"
                      name="status"
                      value={each}
                      checked={status === each}
                      onChange={(e) => setStatus(e.target.value as ToastStatus)}
                    />{" "}
                    {each}
                  </label>
                ))}
              </div>
            </div>

            <div className={cx("option")}>
              <div className={cx("option-title")}>Delay (ms)</div>
              <input
                type="number"
                className={cx("delay-input")}
                value={delay === null ? "" : delay}
                onChange={handleDelayChange}
                step={1000}
                min={0}
                disabled={isDelayNull}
              />
              <label>
                <input
                  type="checkbox"
                  checked={isDelayNull}
                  onChange={handleDelayNullToggle}
                />
                Set delay to null
              </label>
            </div>

            <div className={cx("option")}>
              <div className={cx("option-title")}>Message</div>
              <input
                type="text"
                className={cx("message-input")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className={cx("btn-container")}>
            <button type="button" onClick={clearAll}>
              Clear All
            </button>
            <button
              type="button"
              onClick={() =>
                showToastMessage(message, { position, delay, status })
              }
            >
              Toast Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
