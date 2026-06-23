import styles from "./user.module.css";
import { Form, useActionData } from "react-router-dom";

export default function User() {
  const actionData = useActionData();

  return (
    <div className={styles.user}>
      <div className={styles.overlay}>
        <div className={styles.card}>
          <h1>WHERE'S WALLY?</h1>
          <p>Find Wally and his Friends</p>

          <Form method="post" className={styles.userForm}>
            {actionData?.error && (
              <div className={styles.error}>{actionData.error}</div>
            )}

            <label htmlFor="name">Enter Name</label>

            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              required
            />

            <button type="submit">Start Game</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
