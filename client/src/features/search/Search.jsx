import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  console.log(query);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/atm/search?query=${query}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query.trim() !== "") {
      fetchData();
      setShowResults(true);
    } else {
      setShowResults(false);
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search your Nearest Atms"
        className="w-[80%] outline-none font-secondary text-xs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {showResults && (
        <div className="absolute border-[1px] w-[300px] z-40 py-[20px] top-12 left-0 rounded-[10px] bg-white border-green-400">
          <h2 className="font-primary text-sm px-4">Results:</h2>
          <ul>
            {results && results.map((result) => (
              <div to={`/atms/${result._id}`} key={result && result._id} className="py-2  font-secondary cursor-pointer hover:bg-green-100">
                <NavLink to={`/atms/${result._id}`}><p className="px-4 font-secondary text-xs">{result && result.name}</p></NavLink>
                <div className="px-4">
                <div className="font-secondary text-xs  relative yellowLine pl-[50px]">Currently {result && result.cashstatus ? <span className="text-[#3cb878]">Cash Available</span>:<span className="text-red-500">Cash Not Available</span>}</div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
