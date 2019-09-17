package com.ires.computers.models;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="calculator")
public class Calculator
{
    @Id
    @GeneratedValue
    @Column(name="id")
    private int id;
    
    @Column(name="espression")
    private String expression;
    
    @Column(name="result")
    private double result;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getExpression() {
        return expression;
    }
    public void setName(String result) {
        this.name = result;
    }

    
}
