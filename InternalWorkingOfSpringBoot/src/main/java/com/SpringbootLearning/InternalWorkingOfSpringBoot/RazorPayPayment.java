package com.SpringbootLearning.InternalWorkingOfSpringBoot;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component //to make beans
@ConditionalOnProperty(name="payment.provider", havingValue="RazorPay")
public class RazorPayPayment implements PaymentService {
    public String pay(){
        String payment="Razorpay Payment";
        System.out.println("Payments from"+payment);
        return payment;
    }
}
