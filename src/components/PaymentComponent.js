import React from 'react';
import Stripe from "react-stripe-checkout";
import {payment} from '../services/Service'

const PaymentComponent = ()=>{

    async function handletoken(token){
        console.log(token)
        payment().then((response)=>{
            alert("Payment Success");
        }).catch((error)=>{
            alert(error);
        });
    }

    return(
            <div>
                <Stripe token={handletoken}/>
            </div>
    );
}

export default PaymentComponent;