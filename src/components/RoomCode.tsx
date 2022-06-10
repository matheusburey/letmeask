import copyImg from "../assets/images/copy.svg";

import "../style/room-code.scss";

interface IRoomCodeProps {
  code: string;
}
function RoomCode({ code }: IRoomCodeProps) {
  const copyRoomCode = () => {
    const type = "text/plain";
    const blob = new Blob([code], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);
  };

  return (
    <button id="room_code" type="button" onClick={copyRoomCode}>
      <div>
        <img src={copyImg} alt="copy code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}

export default RoomCode;
