import RestrauntCard, { withPromotedLabel } from "./RestrauntCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RESTRAUNTS_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestraunts, setListOfRestraunts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestraunts, setFilteredRestraunts] = useState([]);
  const RestrauntCardPromoted = withPromotedLabel(RestrauntCard);

  // console.log("List of restraunts", listOfRestraunts);

  //shorten it, make a custom hook and remove fetch logic
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

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus)
    return <h1>Looks like you are offline!! Check your internet connection</h1>;

  return listOfRestraunts.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="m-4 p-4">
          <input
            type="text"
            className="border border-solid"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 cursor-pointer rounded-lg"
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
          <button
            className="px-4 py-2 bg-gray-100 cursor-pointer"
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
      </div>
      <div className="flex flex-wrap">
        {filteredRestraunts.map((restraunt) => (
          <Link
            to={"/restaurants/" + restraunt?.info?.id}
            key={restraunt?.info?.id}
          >
            {restraunt?.info?.avgRating > 4.5 ? (
              <RestrauntCardPromoted resData={restraunt} />
            ) : (
              <RestrauntCard resData={restraunt} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
