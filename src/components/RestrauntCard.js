import { CDN_URL } from "../utils/constants";

const RestrauntCard = (props) => {
  const { resData } = props;
  console.log(resData)

  return (
    <div className="m-4 p-4 w-56 rounded-lg bg-gray-100 hover:bg-gray-200">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + resData?.info?.cloudinaryImageId}
      />
      <h3 className="font-bold py-2 text-lg">{resData?.info?.name}</h3>
      <h4>{resData?.info?.cuisines.join(", ")}</h4>
      <h4>{resData?.info?.avgRatingString} stars</h4>
      <h4>{resData?.info?.sla?.slaString}</h4>
      <h4>{resData?.info?.costForTwo}</h4>
    </div>
  );
};

export const withPromotedLabel = (RestrauntCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <RestrauntCard {...props} />
      </div>
    );
  };
};

export default RestrauntCard;
