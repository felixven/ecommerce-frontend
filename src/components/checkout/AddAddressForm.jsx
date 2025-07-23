import React, { useEffect, useState } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import { Spinners } from '../shared/Spinners';
import { addUpdateUserAddress } from '../../store/actions';
import { taiwanPostcodes } from "../../utils/taiwanPostcodes";

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [postcode, setPostcode] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });


    const onSaveAddressHandler = async (data) => {
        console.log("Address form data:", data);
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ));
    };


    useEffect(() => {
        if (address?.addressId) {
            setValue("fullName", address?.fullName);
            setValue("phoneNumber", address?.phoneNumber);
            setValue("city", address?.city);
            setValue("district", address?.district);
            setValue("postalCode", address?.postalCode);
            setValue("street", address?.street);
            setSelectedCity(address?.city);
            setSelectedDistrict(address?.district);
            setPostcode(address?.postalCode);
        }
    }, [address]);

    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setSelectedDistrict("");
        setPostcode("");
        setValue("city", city);
        setValue("district", "");
        setValue("postalCode", "");
    };

    const handleDistrictChange = (e) => {
        const district = e.target.value;
        const code = taiwanPostcodes[selectedCity][district];
        setSelectedDistrict(district);
        setPostcode(code);
        setValue("district", district);
        setValue("postalCode", code);
    };

    return (
        <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
                <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                    <FaAddressCard className="mr-2 text-2xl" />
                    {!address?.addressId ?
                        "建立地址" :
                        "修改地址"
                    }

                </div>
                <div className="flex flex-col gap-4">

                    <p className="font-semibold text-lg text-gray-800">收件人資訊</p>

                    <InputField
                        label="收件人姓名"
                        required
                        id="fullName"
                        type="text"
                        message="*收件人姓名是必填欄位"
                        placeholder="請輸入姓名"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="收件人電話"
                        required
                        id="phoneNumber"
                        type="text"
                        message="*收件人電話是必填欄位"
                        placeholder="請輸入電話"
                        register={register}
                        errors={errors}
                    />

                    <p className="font-semibold text-lg text-gray-800 pt-2">收件地址</p>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">城市/縣</label>
                        <select
                            value={selectedCity}
                            onChange={handleCityChange}
                            className="border rounded p-2"
                        >
                            <option value="">請選擇縣市</option>
                            {Object.keys(taiwanPostcodes).map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        {errors.city && <span className="text-red-500 text-sm mt-1">*城市/縣是必填欄位</span>}
                    </div>

                    {/* 地區 */}
                    {selectedCity && (
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">地區</label>
                            <select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                className="border rounded p-2"
                            >
                                <option value="">請選擇地區</option>
                                {Object.keys(taiwanPostcodes[selectedCity]).map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            {errors.district && <span className="text-red-500 text-sm mt-1">*地區是必填欄位</span>}
                        </div>
                    )}

                    {/* 郵遞區號（自動填） */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">郵遞區號</label>
                        <input
                            type="text"
                            value={postcode}
                            readOnly
                            className="border rounded p-2 bg-gray-100"
                        />
                        {errors.postalCode && <span className="text-red-500 text-sm mt-1">*郵遞區號是必填欄位</span>}
                    </div>
                    <InputField
                        label="完整地址"
                        required
                        id="street"
                        type="text"
                        message="*完整地址是必填欄位"
                        placeholder="請輸入完整地址"
                        register={register}
                        errors={errors}
                    />

                </div>
                <button
                    disabled={btnLoader}
                    className="text-white bg-black px-4 py-2 rounded-md mt-4"
                    type="submit">
                    {btnLoader ? (
                        <>
                            <Spinners /> Loading...
                        </>
                    ) : (
                        <> 儲存</>
                    )}
                </button>
            </form>
        </div >
    )
}

export default AddAddressForm