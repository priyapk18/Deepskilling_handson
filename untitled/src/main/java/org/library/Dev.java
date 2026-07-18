package org.library;


public class Dev {
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    private int age;
    public Dev(){
        System.out.println("Dev Constructor");
    }
    public void build(){

        System.out.println("Working");
    }
}
