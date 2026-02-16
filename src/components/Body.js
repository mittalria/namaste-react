import RestrauntCard from "./RestrauntCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RESTRAUNTS_API } from "../utils/constants";

const Body = () => {
  const [listOfRestraunts, setListOfRestraunts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestraunts, setFilteredRestraunts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTRAUNTS_API);

    const json = await data.json();

    const restrauntList =
      json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setListOfRestraunts(restrauntList);
    setFilteredRestraunts(restrauntList);
  };

  return listOfRestraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const filteredRestraunt = listOfRestraunts.filter((res) =>
                res?.info?.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase()),
              );
              setFilteredRestraunts(filteredRestraunt);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestraunts.filter(
              (res) => res?.info?.avgRating > 4,
            );
            setListOfRestraunts(filteredList);
          }}
        >
          Top Rated Restraunts
        </button>
      </div>
      <div className="res-container">
        {filteredRestraunts.map((restraunt) => (
          <Link
            to={"/restaurants/" + restraunt?.info?.id}
            key={restraunt?.info?.id}
          >
            <RestrauntCard resData={restraunt} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
