package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.Set;

@Controller
public class ConversationController {
    private final ConversationRepository repository;
    private final EmojiUserRepository userRepo;

    @Autowired
    public ConversationController(ConversationRepository repository, EmojiUserRepository userRepo) {
        this.repository = repository;
        this.userRepo = userRepo;
    }

    @RequestMapping(value = "/new-conversation", method = RequestMethod.POST)
    @ResponseBody
    public Conversation registerUserAccount(@RequestBody final NewConversationDto newConversationDto,
                                            final HttpServletRequest request) {
        Conversation convo = new Conversation();
        for(Long id : newConversationDto.participants) {
            convo.getParticipant().add(new EmojiUser(id));
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        convo.getParticipant().add(userRepo.findByName(authentication.getName()));

        repository.save(convo);
        return convo;
    }


    @RequestMapping(value = "/conversations", method = RequestMethod.GET)
    @ResponseBody
    public Set<Conversation> registerUserAccount(final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        EmojiUser me = userRepo.findByName(authentication.getName());

        Set<Conversation> convoSet = repository.findAllByParticipant_Name(authentication.getName());
        return convoSet;
    }

    static class NewConversationDto {
        Set<Long> participants;

        public Set<Long> getParticipants() {
            return participants;
        }

        public void setParticipants(Set<Long> participants) {
            this.participants = participants;
        }
    }
}
