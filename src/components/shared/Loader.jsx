import { FallingLines } from "react-loader-spinner";

const Loader = ({text}) => {

    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center  gap-1">
                <FallingLines
                    color="#22c55e"
                    width="100"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
                <p className="text-slate-800">{text?text:"資料讀取中..."}</p>
            </div>
        </div>

    );

}

export default Loader;