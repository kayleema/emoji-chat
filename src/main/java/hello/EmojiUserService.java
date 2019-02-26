package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EmojiUserService {

    @Autowired
    private EmojiUserRepository repository;

    @Transactional
    public EmojiUser registerNewUserAccount(EmojiUserDto accountDto) throws RuntimeException {
        if (usernameExist(accountDto.getUsername())) {
            throw new RuntimeException("There is an account with that email adress: " + accountDto.getUsername());
        }
        EmojiUser user = new EmojiUser(accountDto.getUsername(), accountDto.getPassword());
        this.repository.save(user);
        return user;
    }

    public boolean usernameExist(String name) {
        EmojiUser user = repository.findByName(name);
        return user != null;
    }
}
