import styles from "./user.module.css";
import { Form, useActionData } from "react-router-dom";

export default function User() {
  const actionData = useActionData();
  return (
    <div className={styles.user}>
      <h1>Welcome to Top Photo Tag!</h1>
      <Form method="post" className={styles.userForm}>
        {actionData && actionData.error && (
          <div className={styles.error}>{actionData.error}</div>
        )}
        <label htmlFor="name">Enter Name</label>
        <input type="text" id="name" name="name" required />
        <button type="submit">Start Game</button>
      </Form>
    </div>
  );
}
