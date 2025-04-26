import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true); // ✅ show/hide spinner
    const [error, setError] = useState(null);

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            console.log("Verify response:", response.data);
            if (response.data.success) {
                navigate("/myorders");
            } else {
                setError("Payment verification failed.");
                navigate("/"); // optional: or show message instead
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError("Something went wrong!");
            navigate("/"); // optional: or show message instead
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            {loading ? (
                <div className="spinner"></div>
            ) : error ? (
                <p className='error-msg'>{error}</p>
            ) : null}
        </div>
    );
};

export default Verify;
