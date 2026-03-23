import { useState } from "react";
import ItemList from "./ItemList";

const RestrauntCatrgory = ({ data, showItems, setShowIndex }) => {
  return (
    <div>
      <div className="w-6/12 bg-gray-200 shadow-lg p-4 my-4 mx-auto">
        <div
          className="flex justify-between cursor-pointer"
          onClick={setShowIndex}
        >
          <span className="font-bold text-lg">
            {data.title} ({data?.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>
        {showItems && <ItemList items={data?.itemCards} />}
      </div>
    </div>
  );
};

export default RestrauntCatrgory;
