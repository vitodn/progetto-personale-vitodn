package com.ires.computers.repositories;

import com.ires.computers.models.Calculator;

import Calculator.models;
import com.ires.computers.viewmodels.CalculatorNew;
import com.ires.computers.viewmodels.CalculatorExpression;
import com.ires.computers.viewmodels.CalculatorResult;
import java.util.List;
import java.util.List;
import org.springframework.stereotype.Component;

@Component(value="in-memory-repo")
public interface CalculatorRepository
{
    List<ComputerExpression> getAll(String namePart);
    Calculator get(int id) throws NotFoundException ;
    void post(CalculatorNew viewModel);
    void put(Calculator viewModel) throws NotFoundException ;
    void delete(int id) throws NotFoundException ;
}