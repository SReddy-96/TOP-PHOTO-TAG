import { NavLink } from "react-router-dom";
import styles from "./nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to={"/"} className={styles.navTitle}>
        PhotoTag
      </NavLink>
    </nav>
  );
}
