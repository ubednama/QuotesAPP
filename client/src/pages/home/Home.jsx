import Feed from "../../Components/Home/Feed";
import LeftBar from "../../Components/Home/LeftBar";
import RightBar from "../../Components/Home/RightBar";

const Home = () => {
  return (
    <div className="flex w-full px-10 rounded-lg">
      <div className="w-[20%] overflow-hidden">
        <LeftBar />
      </div>
      <div className="divider divider-horizontal !w-[2px] !m-0 !p-0"></div>
      <div className="w-[50%] overflow-y-auto h-full">
        <Feed />
      </div>
      <div className="divider divider-horizontal !w-[2px] !m-0 !p-0"></div>
      <div className="w-[30%] overflow-hidden">
        <RightBar />
      </div>
    </div>
  );
}

export default Home
