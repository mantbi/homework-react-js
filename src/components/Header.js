import style from "../styles/header.module.css";
import SearchButton from "./SearchButton";
import SearchField from "./SearchField";

const Header = () => {
  return (
    <div className={style.head}>
      <div className={style.child}>
        <SearchField />
        <SearchButton />
      </div>
    </div>
  );
};

export default Header;
