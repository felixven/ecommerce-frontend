import { Button, Step, StepLabel, Stepper } from '@mui/material'
import Skeleton from '../shared/Skeleton';
import React, { useEffect, useState } from 'react'
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import ErrorPage from '../shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import LinepayPayment from './LinepayPayment';
import PaypalPayment from './PaypalPayment';



const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors);//loadding state, getting frm local redux store
    const { cart, totalPrice } = useSelector((state) => state.carts);
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    )

    const { paymentMethod } = useSelector((state) => state.payment);

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleNext = () => {
        if (activeStep === 0 && !selectedUserCheckoutAddress) {
            toast.error("Please select checkout address before proceeding.");
            return;
        }
        if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
            toast.error("Please select payment address before proceeding.");
            return;
        }
        setActiveStep((prevStep) => prevStep + 1);
    }

    const steps = [
        "地址",
        "付款方式",
        "訂單內容",
        "付款"
    ];

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    return (
        <div className='py-14 min-h-[CgAlignCenter(100vh-100px)]'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {isLoading ? (
                <div className='lg:w-[80%] mx-auto py-5'>
                    <Skeleton />
                </div>
            ) : (
                <div className='mt-5'>
                    {activeStep === 0 && <AddressInfo address={address} />}
                    {activeStep === 1 && <PaymentMethod />}
                    {activeStep === 2 && <OrderSummary totalPrice={totalPrice}
                        cart={cart}
                        address={selectedUserCheckoutAddress}
                        paymentMethod={paymentMethod} />}
                    {activeStep === 3 &&
                        <>
                            {paymentMethod === "Stripe" ? (
                                <StripePayment />
                            ) : (
                                <LinepayPayment />
                            )}
                        </>}
                </div>
            )}


            <div
                className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200'
                style={{ boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)" }}>
                <Button
                    variant='outlined'
                    disabled={activeStep === 0}
                    onClick={handleBack}>
                    上一步
                </Button>

                {activeStep !== steps.length - 1 && (
                    <button
                        disabled={
                            errorMessage || (
                                (activeStep === 0 ? !selectedUserCheckoutAddress
                                    : activeStep === 1 ? !paymentMethod
                                        : false
                                )
                            )
                        }
                        className={`bg-black font-semibold px-6 h-10 rounded-md text-white
                            ${errorMessage ||
                                (activeStep === 0 && !selectedUserCheckoutAddress) ||
                                (activeStep === 1 && !paymentMethod)
                                ? "opacity-60"
                                : ""
                            }`}
                        onClick={handleNext}>
                        下一步
                    </button>
                )}

            </div>
            {errorMessage && <ErrorPage message={errorMessage} />}
        </div>
    )
}

export default Checkout