import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../../util/Variables";
import styles from "./SearchBox.module.scss";

export const SearchBox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`${SERVER}/posts/search?q=1&size=10`);
  };

  return (
    <form className={styles.searchBox} onSubmit={onSubmitHandler}>
      <input
        placeholder="Please enter your search term"
        type="text"
        onChange={onChangeHandler}
      ></input>
    </form>
  );
};
