import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Expression;
import javax.persistence.Result;


@Entity
@Table(name="calculator")
public class calculator
{
    @Id
    @GeneratedValue
    @Column(name="id")
    private int id;
    
    @Column(name="expression")
    private String expString;
    
    @Column(name="result")
    private double result;
    

    public int getId() {
        return id;
    }
    public void setExp(int id) {
        this.id = id;
    }

    public String getRes() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

  
}