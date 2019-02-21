package hello;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@ToString(exclude = "password")
@Entity
public class EmojiUser {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private @JsonIgnore
    String password;

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    protected EmojiUser() {
    }

    public EmojiUser(String name, String password) {
        this.name = name;
        this.setPassword(password);
    }

}
