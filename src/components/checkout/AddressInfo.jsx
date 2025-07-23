
import React, { useState } from 'react'
import Skeleton from '../shared/Skeleton';
import { FaAddressBook } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import { deleteUserAddress } from '../../store/actions';
import toast from 'react-hot-toast';

const AddressInfo = ({ address }) => {

    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");

    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    }

    const dispatch = useDispatch();

    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(
            toast,
            selectedAddress?.addressId,
            setOpenDeleteModal
        ))
    };

    const noAddressExist = !address || address.length === 0;
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    return (
        <div className='pt-4'>
            {noAddressExist ? (
                <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
                    <FaAddressBook size={50} className='text-gray-500 mb-4 ' />
                    <h1 className='mb-2 text-slate-900 text-center font-semibold text-2xl'>
                        目前沒有常用地址
                    </h1>
                    <p className='mb-6 text-slate-800 text-center'>
                        請加入地址完成結帳
                    </p>

                    <button
                        onClick={addNewAddressHandler}
                        className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition-all">
                        加入地址
                    </button>

                </div>
            ) : (
                <div className='relative p-6 rounded-lg max-w-md mx-auto'>
                    <h1 className='text-slate-800 text-center font-bold text-2xl'>
                        選擇地址
                    </h1>
                    {isLoading ? (
                        <div className='py-4 px-8'>
                            <Skeleton />
                        </div>

                    ) : (
                        <>
                            <div className='space-y-4 pt-6'>
                                <AddressList
                                    addresses={address}
                                    setSelectedAddress={setSelectedAddress}
                                    setOpenAddressModal={setOpenAddressModal}
                                    setOpenDeleteModal={setOpenDeleteModal}
                                />
                            </div>
                            {address.length > 0 && (
                                <div className='mt-4'>
                                    <button
                                        onClick={addNewAddressHandler}
                                        className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition-all">
                                        加入其他地址
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}>
                <AddAddressForm
                    address={selectedAddress}
                    setOpenAddressModal={setOpenAddressModal} />
            </AddressInfoModal>

            <DeleteModal
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="刪除地址"
                onDeleteHandler={deleteAddressHandler} />

        </div>
    )
}

export default AddressInfo