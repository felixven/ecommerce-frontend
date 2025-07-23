import { FallingLines } from "react-loader-spinner";

const Loader = ({text}) => {

    return (
        <div className="flex justify-center items-center w-full h-[450px]">
            <div className="flex flex-col items-center  gap-1">
                <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
                <p className="text-slate-800">{text?text:"Please Wait..."}</p>
            </div>
        </div>

    );

}

export default Loader;