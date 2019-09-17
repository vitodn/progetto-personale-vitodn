package com.ires.calculator.repositories;
import com.ires.calculator.models.Calculator;
import com.ires.calculator.viewmodels.CalculatorNew;
import com.ires.calculator.viewmodels.ComputerExpression;
import java.util.List;
import static java.util.stream.Collectors.toList;
import java.util.stream.IntStream;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component(value="hibernate-repo")
public class HibernateRepository implements CalculatorRepository
{
    private final SessionFactory sessionFactory;
    
    public HibernateRepository() {
        sessionFactory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Calculator.class)
                .buildSessionFactory();
    }
    
    @Override
    public List<CalculatorExpression> getAll(String namePart) {
        try (var session = sessionFactory.openSession()) {
            var models = (List<Calculator>)session
                    .createQuery("from Calculator", Calculator.class)
                    .list();
            var viewModels = models.stream()
                    .map(CalculatorExpression::map)
                    .collect(toList());
            return viewModels;
        }
    }

    @Override
    public Calculator get(int id) throws NotFoundException {
        try (var session = sessionFactory.openSession()) {
            var model = session.get(Computer.class, id);
            if (model == null)
                throw new NotFoundException("calculator not found!");
            return model;
        }
    }

    @Override
    public void post(CalculatorNew viewModel) {
        try (var session = sessionFactory.openSession()) {
            // If there is no autocommit property in the hibernate.cfg.xml,
            // We need to create manually the transactions...
            var trans = session.beginTransaction();
            var model = CalculatorNew.map(viewModel);
            session.save(model);
            // ... and to commit them:
            trans.commit();
        }
    }

    @Override
    public void put(Calculator viewModel) throws NotFoundException {
        try (var session = sessionFactory.openSession()) {
            var trans = session.beginTransaction();
            session.update(viewModel);
            trans.commit();
        }
    }

    @Override
    public void delete(int id) throws NotFoundException {
        try (var session = sessionFactory.openSession()) {
            var trans = session.beginTransaction();
            var model = session.get(Calculator.class, id);
            session.delete(model);
            trans.commit();
        }
    }
}