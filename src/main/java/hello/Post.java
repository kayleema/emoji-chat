package hello;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Post {
    private @Id
    @GeneratedValue
    Long id;

    private String text;

    @CreatedDate
    private Date createdDate;

    @CreatedBy
    private String createdBy;

    private Post() {
    }

    public Post(String text) {
        this.text = text;
    }
}
