import styles from "./scoreboard.module.css";
import { useLoaderData } from "react-router-dom";

export default function Scoreboard() {
  const scores = useLoaderData();
  console.log(scores);
  return (
    <div className={styles.scoreboard}>
      <h1>scoreboard</h1>
      {scores.map((score) => (
        <p>
          {score.name} - {score.score_time}
        </p>
      ))}
    </div>
  );
}
