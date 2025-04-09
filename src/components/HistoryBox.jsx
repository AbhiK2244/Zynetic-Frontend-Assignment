import React from "react";
import { GoHistory } from "react-icons/go";
import { IoClose } from "react-icons/io5";

const HistoryBox = ({showHistory, searchHistory, setShowHistory}) => {
  return (
    <div
      className={`w-full bg-[#263343] absolute top-12 rounded-md p-4 flex flex-col gap-3 ${
        showHistory ? "" : "hidden"
      }`}
    >
      <div className="absolute right-3 top-2 flex justify-end">
        <IoClose
          onClick={() => setShowHistory(false)}
          className="cursor-pointer"
        />
      </div>
      {searchHistory.map((history, index) => (
        <div key={index} className="flex gap-2 items-center">
          <GoHistory />
          <span>{history}</span>
        </div>
      ))}
    </div>
  );
};

export default HistoryBox;
