import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/atm/search?query=${query}`);
        const data = await response.json();
        setLoading(false);
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query.trim() !== "") {
      setLoading(true);
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
        <div className="absolute border-[1px] w-[90%] lg:w-[300px] z-40 py-[20px] top-[110px] left-5 lg:top-12 lg:left-0 rounded-[10px] bg-white border-green-400">
          <h2 className="font-primary text-sm px-4">Results:</h2>
          <div className="w-full">
            {loading ? (
              <div className="h-auto w-full flex items-center justify-center">
                <Hourglass
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#3cb878", "#3cb878"]}
                />
              </div>
            ) : results && results.length > 0 ? (
              results.map((result) => (
                <div
                  to={`/atms/${result._id}`}
                  key={result && result._id}
                  className="py-2  font-secondary cursor-pointer hover:bg-green-100"
                >
                  <NavLink to={`/atms/${result._id}`}>
                    <p className="px-4 font-secondary text-xs">
                      {result && result.name}
                    </p>
                  </NavLink>
                  <div className="px-4">
                    <div className="font-secondary text-xs  relative yellowLine pl-[50px]">
                      Currently{" "}
                      {result && result.cashstatus ? (
                        <span className="text-[#3cb878]">Cash Available</span>
                      ) : (
                        <span className="text-red-500">Cash Not Available</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 font-secondary text-red-500">
                Oops! No Result Found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
