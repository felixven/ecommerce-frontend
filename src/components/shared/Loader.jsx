import { FallingLines } from "react-loader-spinner";

const Loader = ({ text, firstLoad }) => {
  let displayText = "資料讀取中...";

  if (firstLoad) {
    displayText = "伺服器因休眠機制，喚醒可能需要一些時間...";
  } else if (text) {
    displayText = text;
  }

  return (
    <div className="flex justify-center items-center w-full h-[450px]">
      <div className="flex flex-col items-center gap-1">
        <FallingLines
          color="#22c55e"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
        <p className="text-slate-800">{displayText}</p>
      </div>
    </div>
  );
};

export default Loader;