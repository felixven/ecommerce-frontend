import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import { Spinners } from "../shared/Spinners";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        //console.log("Login Click")
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };
    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <AiOutlineLogin className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        會員登入
                    </h1>
                </div>
                <hr className="mt-2 mb-5 text-black" />
                <div className="flex flex-col gap-3">
                    <InputField
                        label="帳號"
                        required
                        id="username"
                        type="text"
                        message="*帳號是必填欄位"
                        placeholder="請輸入帳號"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        label="密碼"
                        required
                        id="password"
                        type="password"
                        message="*密碼是必填欄位"
                        placeholder="請輸入密碼"
                        register={register}
                        errors={errors}
                    />
                </div>
                <button
  disabled={loader}
  className="bg-black hover:bg-gray-800 flex gap-2 items-center justify-center 
    font-semibold text-white w-full py-2 transition-colors duration-200 
    rounded-sm my-3"
  type="submit"
>
  {loader ? (
    <>
      <Spinners />
      Loading...
    </>
  ) : (
    <> 登入 </>
  )}
</button>
                <p className="text-center text-sm text-slate-700 mt-6">
                    還不是會員？趕緊
                    <Link className="font-semibold underline hover:text-black"
                        to="/register">
                        <span className="">註冊</span>
                    </Link>
                </p>
            </form>
        </div >
    )
}

export default LogIn;