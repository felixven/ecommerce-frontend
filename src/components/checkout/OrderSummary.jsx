import React from 'react'
import { formatPriceCalculation } from '../../utils/formatPrice'


const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 pr-4">
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h2 className='text-2xl font-semibold mb-2'>收件地址</h2>

                            <p>
                                <strong>收件人姓名： </strong>
                                {address?.fullName}
                            </p>

                            <p>
                                <strong>收件人電話： </strong>
                                {address?.phoneNumber}
                            </p>

                            <p>
                                <strong>城市/縣市： </strong>
                                {address?.city}
                            </p>

                            <p>
                                <strong>地區： </strong>
                                {address?.district}
                            </p>

                            <p>
                                <strong>郵遞區號： </strong>
                                {address?.postalCode}
                            </p>

                            <p>
                                <strong>完整地址： </strong>
                                {address?.street}
                            </p>
                        </div>

                        <div className='p-4 border rounded-lg shadow-sm'>
                            <h2 className='text-2xl font-semibold mb-2'>
                                付款方式
                            </h2>
                            <p>
                                {paymentMethod}
                            </p>
                        </div>
                        <div className='p-4 border rounded-lg shadow-sm'>
                            <h2 className='text-2xl font-semibold mb-2'>商品明細</h2>
                            <div className='space-y-2'>
                                {cart?.map((item) => (
                                    <div key={item?.productId} className='flex items-center'>
                                        <img src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image
                                            }`}
                                            alt='Product'
                                            className='w-12 h-12 rounded'></img>
                                        <div className='text-gray-500'>
                                            <p>{item?.productName}</p>
                                            <p>
                                                {item?.quantity} x ${item?.specialPrice} = ${
                                                    formatPriceCalculation(item?.quantity, item?.specialPrice)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
                    <div className="border rounded-lg shadow-sm p-4 space-y-4">
                        <h2 className="text-2xl font-semibold mb-2">訂單金額</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>商品金額</span>
                                <span>${formatPriceCalculation(totalPrice, 1)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>運費</span>
                                <span>$0</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>總金額</span>
                                <span>${formatPriceCalculation(totalPrice, 1)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary