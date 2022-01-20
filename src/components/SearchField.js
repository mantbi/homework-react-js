import style from "../styles/searchField.module.css";
import { useState } from "react";

const SearchField = () => {
  const API_KEY = "0d720d9ec399cd0d44f361e8a7dc9255";

  const [inputFocused, setInputFocused] = useState(false);
  const [input, setInput] = useState("");
  const [resultTable, setResultTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mouseInResults, setMouseInResults] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    if (!mouseInResults) {
      setInputFocused(false);
    }
    if (resultTable.length == 0) {
      setInputFocused(false);
    }
  };

  function debounce(func, timeout = 2000) {
    return (...args) => {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          func.apply(this, args);
        }, timeout)
      );
    };
  }

  async function getMovieList(data) {
    if (data !== "") {
      setLoading(true);
      let MOVIE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${data}`;
      const response = await fetch(MOVIE_URL);
      const jsn = await response.json();
      setLoading(false);
      let sortedJSON = jsn.results.sort((a, b) => b.vote_average > a.vote_average);

      setResultTable(sortedJSON.length > 8 ? sortedJSON.slice(0, 8) : sortedJSON.slice(0, jsn.length));
    }
  }

  function getResults(e) {
    const debounceCall = debounce((data) => getMovieList(data));
    if (e.length > 2) {
      debounceCall(e);
    } else {
      debounceCall("");
    }
  }

  function getTitle(title) {
    setInput(title);
    setResultTable([]);
    setInputFocused(false);
  }

  return (
    <table>
      <thead>
        <tr>
          <th valign="top" className={inputFocused ? style.thFocused : ""}>
            <input
              type="text"
              autoComplete="off"
              value={input}
              className={`${inputFocused ? style.inputFocused : ""} ${loading ? style.loadingGif : ""}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => {
                setInput(e.target.value);
                getResults(e.target.value);
              }}
            />
            {inputFocused && <h4>Enter a movie name</h4>}
          </th>
        </tr>
      </thead>
      {inputFocused && (
        <tbody onMouseEnter={() => setMouseInResults(true)} onMouseLeave={() => setMouseInResults(false)}>
          {resultTable.map((result) => (
            <tr key={result.id}>
              <td onClick={() => getTitle(result.title)}>
                <h3>{result.title} </h3>
                <p>
                  {result.vote_average} rating. {result.release_date.slice(0, 4)}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default SearchField;
