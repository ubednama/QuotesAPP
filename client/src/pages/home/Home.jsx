import Feed from "../../Components/Home/Feed";
import LeftBar from "../../Components/Home/LeftBar";
import RightBar from "../../Components/Home/RightBar";

const Home = () => {
  return (
    <div className="flex w-full sm:min-w-[900px] sm:max-w-[1300px] sm:w-[80vw] rounded-lg">
      <div className="w-[25%] overflow-x-auto">
        <LeftBar />
      </div>
      <div className="divider divider-horizontal !w-[2px] !m-0 !p-0"></div>
      <div className="w-[45%]">
        <Feed />
      </div>
      <div className="divider divider-horizontal !w-[2px] !m-0 !p-0"></div>
      <div className="w-[30%] overflow-x-auto">
        <RightBar />
      </div>
    </div>
  );
}

export default Home
