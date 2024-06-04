import Avatar from "../User/Avatar";

const RightBar = () => {
  return (
    <div>
      This is rightbar
      <div>
        Personalities
        <div className="flex h-fit overflow-x-auto hover:overflow-x-scroll">
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </div>
      </div>
      <div>
        users
        <div className="flex h-fit overflow-x-auto hover:overflow-x-scroll">
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default RightBar
