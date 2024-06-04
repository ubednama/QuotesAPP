import { CiBookmark, CiHeart } from "react-icons/ci";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatTime";

const CardComponent = ({quote}) => {

  return (
    <>
      <div className="bg-gray-50 dark:bg-black w-full flex items-center justify-center border-b-[1px] border-gray-600">
        <div className="bg-white w-full px-10 dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 border max-w-xl">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <img
                className="h-11 w-11 rounded-full"
                src="https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg"
              />
              <div className="ml-1.5 text-sm leading-tight">
                <span className="text-black dark:text-white text-sm font-bold block ">
                  {quote.author}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                  @visualizevalue
                </span>
              </div>
            </div>
          </div>
          <p className="text-black dark:text-white block leading-snug mt-3">
            {quote.quote}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs py-1 my-0.5">
            {formatDate(quote.date)}
          </p>
          <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
          <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-between">
            <div className="flex items-center mr-6">
              <CiHeart /> <span className="ml-3">{quote.likes >= 1 ? quote.likes > 1 ? quote.likes + 'likes' : quote.likes + 'like' : ''}</span>
            </div>
            <div className="flex items-center mr-6">
              <CiBookmark />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


CardComponent.propTypes = {
  quote: PropTypes.shape({
    author: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    source: PropTypes.string,
    date: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    language: PropTypes.string,
    likes: PropTypes.number,
    // createdAt: PropTypes.instanceOf(Date),
    // updatedAt: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default CardComponent;
