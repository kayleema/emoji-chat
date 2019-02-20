package hello;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Post {
    private @Id
    @GeneratedValue
    Long id;

    private String text;
    private String subject;

    private Post() {
    }

    public Post(String text, String subject) {
        this.text = text;
        this.subject = subject;
    }
}
