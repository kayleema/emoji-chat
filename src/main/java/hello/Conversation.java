package hello;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@Entity
public class Conversation {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToMany
    @JsonIgnoreProperties("friend")
    private Set<EmojiUser> participant = new HashSet<>();
}
