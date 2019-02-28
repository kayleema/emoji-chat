package hello;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

import static javax.persistence.TemporalType.TIMESTAMP;

@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@Entity
public class Message {
    @Id
    @GeneratedValue
    private Long id;

    @CreatedDate
    @Temporal(TIMESTAMP)
    private Date createdDate;

    private String text;

    @JsonIgnoreProperties("friend")
    @ManyToOne
    private EmojiUser from;

    @JsonIgnoreProperties("participant")
    @ManyToOne
    private Conversation conversation;


    @PrePersist
    protected void onCreate() {
        createdDate = new Date();
    }
}
