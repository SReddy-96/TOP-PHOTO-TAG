  import { useState } from "react";
import styles from "./index.module.css";
import clickFunc from "../../assets/clickFunc.jsx";
import wallyImage from "/images/Wheres-Waldo-Skiing-Super-High-Resolution-scaled.jpg";

export default function Index() {
  const [clickPosition, setClickPosition] = useState({ x: null, y: null });

  const handleClick = (event) => {
    const position = clickFunc("image", event);
    setClickPosition(position);
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
        {clickPosition.x !== null && (
          <div
            className={styles.clickDisplay}
            style={{ left: `${clickPosition.x}px`, top: `${clickPosition.y}px` }}
          />
        )}
      </div>
    </div>
  );
}
