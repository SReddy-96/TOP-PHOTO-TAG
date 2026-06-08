import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./index.module.css";
import clickFunc from "../../assets/clickFunc.jsx";
import wallyImage from "/images/Wheres-Waldo-Skiing-Super-High-Resolution-scaled.jpg";

export default function Index() {
  const [clickPosition, setClickPosition] = useState({
    x: null,
    y: null,
    direction: "right",
  });

  // get users id from params
  const [params] = useSearchParams();
  const user_id = params.get("id");

  // this looks out for other clicks in the document other than the image and handling the dropdown form.
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const checkTagForm = document.getElementById("tagForm");
      if (
        checkTagForm &&
        event.target.id !== "image" &&
        !checkTagForm.contains(event.target)
      ) {
        setClickPosition({
          x: null,
          y: null,
          direction: "right",
        });
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    }; // Clean up any existing listeners
  }, []);

  const handleClick = (event) => {
    const position = clickFunc("image", event);
    const rect = event.currentTarget.getBoundingClientRect();
    const formWidth = 240;
    const margin = 16;
    const direction =
      rect.width * (position.x / 100) + formWidth + margin > rect.width
        ? "left"
        : "right";
    setClickPosition({ ...position, direction });
  };

  return (
    <div className={styles.index}>
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
              left: `${clickPosition.x}%`,
              top: `${clickPosition.y}%`,
            }}
          >
            <div className={styles.clickDot} />
            <div
              className={`${styles.tagPanel} ${
                clickPosition.direction === "right" ? styles.right : styles.left
              }`}
            >
              <form
                action=""
                id="tagForm"
                className={styles.tagForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  setClickPosition({ x: null, y: null, direction: "right" });
                }}
              >
                <select id="tagName" name="tagName">
                  <option value="wally">Wally</option>
                  <option value="wilma">Wilma</option>
                  <option value="odlaw">Odlaw</option>
                  <option value="wizard">Wizard</option>
                  <option value="woof">Woof</option>
                </select>
                <button type="submit">Tag</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
