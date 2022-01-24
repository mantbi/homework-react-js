import style from "../styles/header.module.css";
import SearchButton from "./SearchButton";
import SearchField from "./SearchField";
import { useState } from "react";

const Header = () => {
  const [sendData, setSendData] = useState("");

  const pull_data = (data) => {
    setSendData(data);
  };

  return (
    <div className={style.head}>
      <div className={style.child}>
        <SearchField searchValue={pull_data} />
        <SearchButton result={sendData} />
      </div>
    </div>
  );
};

export default Header;
