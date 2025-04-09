import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import HistoryBox from "./HistoryBox";


const Header = ({
  mode,
  cityInput,
  handleInputChange,
  handleClickSearch,
  toggleMode,
  searchHistory,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div
        className={`w-3/4 flex rounded-full relative ${
          mode === "dark" ? "component-dark" : "component-light"
        }`}
      >
        <input
          onClick={() => setShowHistory(true)}
          autoFocus
          placeholder="Search for a city"
          className={`w-full py-2 pl-4 outline-none border-r ${
            mode === "light"
              ? "placeholder:text-neutral-500 border-neutral-300"
              : "border-neutral-700"
          }`}
          type="text"
          value={cityInput}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={cityInput.length < 3}
          onClick={() => {
            handleClickSearch();
            setShowHistory(false);
          }}
          className={`px-8 rounded-r-full cursor-pointer flex items-center justify-center ${
            mode === "dark" ? "hover:bg-[#252e4e]" : "hover:bg-neutral-100"
          } `}
        >
          <FaSearch />
        </button>

        {/* history box  */}
        <HistoryBox searchHistory={searchHistory} setShowHistory={setShowHistory} showHistory={showHistory} />
        
      </div>
      <div onClick={toggleMode} className="text-3xl cursor-pointer mr-8">
        {mode === "dark" ? (
          <MdLightMode className="text-yellow-500" />
        ) : (
          <MdDarkMode className="text-white" />
        )}
      </div>
    </div>
  );
};

export default Header;
