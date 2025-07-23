import React from 'react'
import { use } from 'react';
import { FaCheckCircle, FaTrash, FaEdit, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserCheckoutAddress } from '../../store/actions';

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal }) => {

    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
    ;

    const onEditButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
        setOpenAddressModal(true);
    };

    const onDeleteButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
        setOpenDeleteModal(true);
    };

    const handleAddressSelection = (addresses) => {
        dispatch(selectUserCheckoutAddress(addresses));
    };

    return (
        <div className='space-y-4'>
            {addresses.map((address) => (
                <div
                    key={address.addressId}
                    onClick={() => handleAddressSelection(address)}
                    className={`p-4 border rounded-md cursor-pointer relative ${selectedUserCheckoutAddress?.addressId === address.addressId
                        ? "bg-green-100"
                        : "bg-white"
                        }`}>
                    <div className="flex items-start">
                        <div className="space-y-1">
                            <div className="flex items-center">
                                <FaUser size={14} className="mr-2 text-gray-600" />
                                <p className="font-semibold">{address.fullName}</p>
                                {selectedUserCheckoutAddress?.addressId === address.addressId && (
                                    <FaCheckCircle className="text-green-500 ml-2" />
                                )}
                            </div>

                            {/* 收件人電話 */}
                            <div className="flex items-center">
                                <FaPhone size={14} className="mr-2 text-gray-600" />
                                <p>{address.phoneNumber}</p>
                            </div>

                            {/* 城市與地區 */}
                            <div className="flex items-center">
                                <MdLocationCity size={17} className="mr-2 text-gray-600" />
                                <p>{address.city}, {address.district}</p>
                            </div>

                            {/* 郵遞區號 */}
                            <div className="flex items-center">
                                <MdPinDrop size={17} className="mr-2 text-gray-600" />
                                <p>{address.postalCode}</p>
                            </div>

                             {/* 地址 */}
                            <div className="flex items-center">
                                <FaMapMarkerAlt size={14} className="mr-2 text-gray-600" />
                                <p>{address.street}</p>
                            </div>

                        </div>
                    </div>


                    <div className="flex gap-3 absolute top-4 right-2">
                        <button onClick={() => onEditButtonHandler(address)}>
                            <FaEdit size={18} className="text-teal-700" />
                        </button>
                        <button onClick={() => onDeleteButtonHandler(address)}>
                            <FaTrash size={17} className="text-rose-600" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AddressList