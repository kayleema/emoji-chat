package hello;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.Proxy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@ToString(exclude = "password")
@Entity
public class EmojiUser implements Serializable {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToMany
    @JsonIgnoreProperties("friend")
    private List<EmojiUser> friend;

    @JsonIgnore
    private String password;

    private String country;

    private String email;

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    protected EmojiUser() {
    }

    public EmojiUser(String name, String password) {
        this.name = name;
        this.setPassword(password);
    }

    public EmojiUser(Long id) {
        this.id = id;
    }

}
