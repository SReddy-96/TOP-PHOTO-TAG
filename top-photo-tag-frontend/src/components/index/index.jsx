import { useEffect, useState } from "react";
import {
  useLoaderData,
  useSearchParams,
  Form,
  useActionData,
} from "react-router-dom";
import styles from "./index.module.css";
import clickFunc from "../../assets/clickFunc.jsx";
import wallyImage from "/images/Wheres-Waldo-Skiing-Super-High-Resolution-scaled.jpg";

export default function Index() {
  const [clickPosition, setClickPosition] = useState({
    x: null,
    y: null,
    direction: "right",
  });
  const [submitted, setSubmitted] = useState(false);
  const [foundCharacters, setFoundCharacters] = useState([]);

  // get characters from loader
  const characters = useLoaderData();

  // action data from form
  const actionData = useActionData();

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

  // handle clicking and styling of dropdown
  const handleClick = (event) => {
    setSubmitted(false);
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

  // handles characters that have been found
  useEffect(() => {
    if (actionData?.character_id) {
      setFoundCharacters((prev) => [
        ...prev,
        parseInt(actionData.character_id),
      ]);
    }
  }, [actionData]);

  return (
    <div className={styles.index}>
      {!actionData && (
        <p className={styles.foundCharacters}>
          Click to find Wally and his Friends
        </p>
      )}
      {actionData?.status == "found" && (
        <p className={styles.foundCharacters}>
          {
            characters.find(
              (character) => character.id === parseInt(actionData.character_id),
            ).name
          }{" "}
          Found
        </p>
      )}
      {actionData?.status == "not found" && <span>Not Found</span>}
      <div className={styles.photoWrapper}>
        <img
          id="image"
          src={wallyImage}
          alt="Where's Waldo?"
          className={styles.samplePhoto}
          onClick={handleClick}
        />

        {/* a small dot at the click location with the form panel positioned next to it */}
        {clickPosition.x !== null && !submitted && (
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
              <Form
                method="post"
                id="tagForm"
                className={styles.tagForm}
                onSubmit={() => setSubmitted(true)}
              >
                {actionData && actionData.error && (
                  <div className={styles.error}>{actionData.error}</div>
                )}
                <select id="tagName" name="tagName">
                  {characters
                    .filter((c) => !foundCharacters.includes(c.id))
                    .map((character) => (
                      <option key={character.id} value={character.id}>
                        {character.name}
                      </option>
                    ))}
                </select>
                <input type="hidden" name="user_id" value={user_id} />
                <input type="hidden" name="x" value={clickPosition.x} />
                <input type="hidden" name="y" value={clickPosition.y} />
                <button type="submit">Tag</button>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
