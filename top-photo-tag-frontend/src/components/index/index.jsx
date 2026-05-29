import { useState } from "react";
import styles from "./index.module.css";
import clickFunc from "../../assets/clickFunc.jsx";
import wallyImage from "/images/Wheres-Waldo-Skiing-Super-High-Resolution-scaled.jpg";

export default function Index() {
  const [clickPosition, setClickPosition] = useState({
    x: null,
    y: null,
    direction: "right",
  });

  const handleClick = (event) => {
    const position = clickFunc("image", event);
    const rect = event.currentTarget.getBoundingClientRect();
    const formWidth = 240;
    const margin = 16;
    const direction =
      rect.width - position.x > formWidth + margin ? "right" : "below";

    setClickPosition({ ...position, direction });
  };

  return (
    <div className={styles.index}>
      <h1>Welcome to Top Photo Tag!</h1>
      <div className={styles.photoWrapper}>
        <img
          id="image"
          src={wallyImage}
          alt="Where's Waldo?"
          className={styles.samplePhoto}
          onClick={handleClick}
        />

        {/* a small dot at the click location with the form panel positioned next to it */}
        {clickPosition.x !== null && (
          <div
            className={styles.clickDisplay}
            style={{
              left: `${clickPosition.x}px`,
              top: `${clickPosition.y}px`,
            }}
          >
            <div className={styles.clickDot} />
            <div
              className={`${styles.tagPanel} ${
                clickPosition.direction === "right"
                  ? styles.right
                  : styles.below
              }`}
            >
              <form action="" id="tagForm" className={styles.tagForm}>
                <label htmlFor="tagName">Tag Name:</label>
                <select id="tagName" name="tagName">
                  <option value="wally">Wally</option>
                  <option value="wilma">Wilma</option>
                  <option value="odlaw">Odlaw</option>
                  <option value="wizard">Wizard</option>
                  <option value="woof">Woof</option>
                </select>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
