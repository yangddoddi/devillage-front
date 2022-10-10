import { useState } from "react";
import styles from "./SearchBox.module.scss";

export const SearchBox = () => {
  const [search, setSearch] = useState("");

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form className={styles.searchBox}>
      <input
        placeholder="Please enter your search term"
        type="text"
        onChange={onChangeHandler}
      ></input>
    </form>
  );
};
