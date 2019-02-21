package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

    private final EmojiUserRepository repository;

    @Autowired
    public SpringDataJpaUserDetailsService(EmojiUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        EmojiUser emojiUser = this.repository.findByName(name);
        return new User(emojiUser.getName(), emojiUser.getPassword(),
                AuthorityUtils.createAuthorityList("USER"));
    }
}