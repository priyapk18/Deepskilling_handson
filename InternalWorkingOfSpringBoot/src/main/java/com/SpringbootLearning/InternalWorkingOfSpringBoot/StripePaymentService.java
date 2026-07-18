package com.SpringbootLearning.InternalWorkingOfSpringBoot;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Repository;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RestController;

@Component
//@Service
//@Repository
//@RestController
@ConditionalOnProperty(name="payment.provider", havingValue="stripe")
public class StripePaymentService implements PaymentService{
    @Override
    public String pay() {
        String payment="Stripe Payment";
        System.out.println("Payments from"+payment);
        return payment;
    }
}
