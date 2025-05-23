import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useState } from "react";

const TOAST_POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;
type TToastPosition = (typeof TOAST_POSITIONS)[number];

const cx = classNames.bind(styles);

export default function Home() {
  const [position, setPosition] = useState<TToastPosition>("top-right");
  const [delay, setDelay] = useState(3000);
  const [message, setMessage] = useState("Toast Message");

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
                        setPosition(e.target.value as TToastPosition)
                      }
                    />{" "}
                    {pos}
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
            <button type="button">Toast Button</button>
          </div>
        </div>
      </div>
    </>
  );
}
