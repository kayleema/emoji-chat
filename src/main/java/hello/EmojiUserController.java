package hello;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Controller
public class EmojiUserController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    private final EmojiUserService service;

    @Autowired
    public EmojiUserController(EmojiUserService service) {
        this.service = service;
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    @ResponseBody
    public EmojiUser registerUserAccount(@Valid @RequestBody final EmojiUserDto accountDto,
                                         final HttpServletRequest request) {
        LOGGER.debug("Registering user account with information: {}", accountDto);

        return this.service.registerNewUserAccount(accountDto);
    }

    @RequestMapping(value = "/user-details", method = RequestMethod.GET)
    @ResponseBody
    public EmojiUser userDetails(final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.service.findByName(authentication.getName());
    }

    @RequestMapping(value = "/add-friend", method = RequestMethod.POST)
    @ResponseBody
    public AddFriendDto addFriend( @RequestBody AddFriendDto addFriendDto, final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.service.addFriend(authentication.getName(), addFriendDto.username);
        return addFriendDto;
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    @ResponseBody
    public Authentication userLogin(final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication;
    }

    @RequestMapping(value="/user-search/{name}", method = RequestMethod.GET)
    @ResponseBody
    public EmojiUser userSearch(final HttpServletRequest request,
                                @PathVariable("name") String name) {
        if (service.usernameExist(name)) {
            return new EmojiUser(name, "");
        }
        throw new ResourceNotFoundException();
    }

    static class AddFriendDto {
        private String username;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }
}
