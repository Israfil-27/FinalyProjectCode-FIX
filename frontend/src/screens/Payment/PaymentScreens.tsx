import { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './payment.scss';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSetps';
import { savePaymentMethod } from '../../slices/cardSlices';

const PaymentScreens = () => {
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart =useSelector((state:any)=>state.cart)
    const {shippingAddress}  =cart

    useEffect(()=>{
        if (!shippingAddress) {
            navigate("/shipping") 
        }
    },[shippingAddress,navigate])

    const submitHandle = (method:any) => {
        setPaymentMethod(method);
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    };


    return (
        <div className="payment-screen">
            <div className="payment-box">
                <CheckoutSteps step1 step2 step3 step4 />
                <h2>Ödeme Ekranları</h2>
                <p>Ödeme yöntemi seçimi: {paymentMethod}</p>
                <div className="button-group">
                    <button
                        className={paymentMethod === 'PayPal' ? 'active' : ''}
                        onClick={() => submitHandle('PayPal')}
                    >
                        PayPal
                    </button>
                    <button
                        className={paymentMethod === 'Kredi Kartı' ? 'active' : ''}
                        onClick={() => submitHandle('Kredi Kartı')}
                    >
                        Kredi Kartı
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentScreens;
