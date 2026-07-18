package com.example.Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Dev {
//    @Autowired          //field injection
// private Laptop laptop;

//    public Dev(Laptop laptop) //constructor injection
//    {
//        this.laptop=laptop;
//    }

//    @Autowired
//    public void setLaptop(Laptop laptop){  //setter injection
//     this.laptop=laptop;
//  }
    @Autowired
    private Computer comp;
    public void build(){
        comp.compile();
        System.out.println("Working");
    }
}
