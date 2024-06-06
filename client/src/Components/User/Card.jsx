import { CiBookmark, CiHeart } from "react-icons/ci";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatTime";
import Avvvatars from "avvvatars-react";

const CardComponent = ({quote}) => {

  return (
    <div className="bg-black w-full flex items-center justify-center border-b-[1px] border-gray-600">
      <div className="w-full sm:px-10 bg-black p-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <div className="rounded-full !pr-0 !mr-0 border">
              {quote?.profileImageURL ? (
                <img src={quote.profileImageURL}></img>
              ) : (
                <Avvvatars value={quote?.author} size={42} />
              )}
            </div>
            <div className="ml-1.5 text-sm leading-tight">
              <span className=" text-white text-sm font-bold block ">
                {quote.author}
              </span>
              <span className="text-gray-400 font-normal block">
                {quote?.knownFor}
              </span>
            </div>
          </div>
        </div>
        <p className="text-white block leading-snug mt-3">{quote.quote}</p>
        <p className="text-gray-400 text-xs py-1 my-0.5">
          {formatDate(quote.date)}
        </p>
        <div className="border-gray-600 border border-b-0 my-1"></div>
        <div className="text-gray-400 flex mt-3 justify-between">
          <div className="flex items-center mr-6">
            <CiHeart />{" "}
            <span className="ml-3">
              {quote.likeCount >= 1
                ? quote.likeCount > 1
                  ? quote.likeCount + "likes"
                  : quote.likeCount + "like"
                : ""}
            </span>
          </div>
          <div className="flex items-center mr-6">
            <CiBookmark />
          </div>
        </div>
      </div>
    </div>
  );
};


CardComponent.propTypes = {
  quote: PropTypes.shape({
    author: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    knownFor: PropTypes.string,
    profileImageURL: PropTypes.string,
    source: PropTypes.string,
    date: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    language: PropTypes.string,
    likeCount: PropTypes.number,
    // createdAt: PropTypes.instanceOf(Date),
    // updatedAt: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default CardComponent;
