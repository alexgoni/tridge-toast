import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useState } from "react";
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
  const [delay, setDelay] = useState(3000);
  const [message, setMessage] = useState("Toast Message");
  const [status, setStatus] = useState<ToastStatus>("success");
  const { showToastMessage } = useToast();

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
                {TOAST_POSITIONS.map((pos) => (
                  <label key={pos}>
                    <input
                      type="radio"
                      name="position"
                      value={pos}
                      checked={position === pos}
                      onChange={(e) =>
                        setPosition(e.target.value as ToastPosition)
                      }
                    />{" "}
                    {pos}
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
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                step={1000}
                min={0}
              />
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

          <div className={cx("toast-btn-wrapper")}>
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
