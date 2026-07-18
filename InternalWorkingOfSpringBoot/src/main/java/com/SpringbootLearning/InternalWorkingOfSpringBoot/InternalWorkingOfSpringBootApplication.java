package com.SpringbootLearning.InternalWorkingOfSpringBoot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InternalWorkingOfSpringBootApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(InternalWorkingOfSpringBootApplication.class, args);
	}
	//Either use autowired or use the constructor for dependency injection
//    @Autowired
//	private RazorPayPayment Paymentservice;
//dependency injection i.e, whenever the main is run, it uses razorpaypayment method, so created a bean paymnetservice, which is injected using the constructor
//	public InternalWorkingOfSpringBootApplication(RazorPayPayment paymentservice) {
//		Paymentservice = paymentservice;
//	}
private final PaymentService paymentService;

	public InternalWorkingOfSpringBootApplication(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	@Override
	public void run(String... args) throws Exception {
      String payment = paymentService.pay();
	  System.out.println("Payment done"+payment);

	}
}
