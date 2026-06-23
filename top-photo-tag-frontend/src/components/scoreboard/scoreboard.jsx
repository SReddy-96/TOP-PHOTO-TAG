import styles from "./scoreboard.module.css";
import { useLoaderData } from "react-router-dom";

export default function Scoreboard() {
  const { scoreboard, current_user } = useLoaderData();
  return (
    <div className={styles.scoreboardWrapper}>
      <h1>scoreboard</h1>
      <div className={styles.userScore}>
        <p>{current_user.name}</p>
        <p>{current_user.score_time} seconds</p>
      </div>
      <table className={styles.scoreboardTable}>
        <thead>
          <tr>
            <th scope="col">Place</th>
            <th scope="col">Name</th>
            <th scope="col">Score time</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>{score.score_time} seconds</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
