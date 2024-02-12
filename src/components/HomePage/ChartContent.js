import React from "react";

const ChartContent = ({ rank, title, artist, isNew, color }) => {
  return (
    <div className={`bg-${color}-500 p-6 rounded-lg shadow-md flex items-center justify-between h-full`}>
      <div className="mr-6">
        <p className="font-bold">Number: </p>
      </div>
      <div className="mr-6">
        <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
          {rank}
        </div>
      </div>
      <div className="flex-grow">
        <div className="text-left">
          <p className="text-xl font-medium">{title}</p>
          <p className="text-white font-medium">{artist}</p>
        </div>
      </div>
      {isNew && (
        <div className="bg-red-600 text-white rounded-md py-2 px-3 font-bold italic border-red-700 flex-shrink-0">
          New!!
        </div>
      )}
    </div>
  );
};

export default ChartContent;
