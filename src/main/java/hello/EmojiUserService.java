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

    public EmojiUser addFriend(String username, String friendUsername) {
        EmojiUser user = repository.findByName(username);
        user.getFriend().add(repository.findByName(friendUsername));
        this.repository.save(user);
        return user;
    }

    public EmojiUser findByName(String name) {
        return repository.findByName(name);
    }

    public EmojiUser getById(Long id) {
        return repository.findById(id);
    }

    public EmojiUser updateProfile(EmojiUser me) {
        return repository.save(me);
    }
}
