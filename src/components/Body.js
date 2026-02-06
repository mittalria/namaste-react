import RestrauntCard from "./RestrauntCard";
import { useEffect, useState } from "react";

const Body = () => {
  const [listOfRestraunts, setListOfRestraunts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&collection=80382&tags=layout_CCS_CholeBhature&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );

    const json = await data.json();
    const filteredJson = (json?.data?.cards).filter(
      (item) => item?.card?.card.info
    );
    setListOfRestraunts(filteredJson);
  };

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestraunts.filter(
              (res) => res?.card?.card?.info?.avgRating > 4
            );
            setListOfRestraunts(filteredList);
          }}
        >
          Top Rated Restraunts
        </button>
      </div>
      <div className="res-container">
        {listOfRestraunts.map((restraunt) => (
          <RestrauntCard
            key={restraunt?.card?.card?.info?.id}
            resData={restraunt?.card?.card}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
