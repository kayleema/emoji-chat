package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final PostRepository repository;

    @Autowired
    public DatabaseLoader(PostRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.repository.save(new Post("おはよう世界!!!", "s1s"));
        this.repository.save(new Post("おはよう世界!!!", "s2s"));
    }
}
