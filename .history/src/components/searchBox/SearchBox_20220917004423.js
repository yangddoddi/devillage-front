import styles from "SearchBox.module.scss";

export const SearchBox = () => {
  return (
    <form className={styles.searchBox}>
      <input placeholder="Please enter your search term" type="text"></input>
    </form>
  );
};
