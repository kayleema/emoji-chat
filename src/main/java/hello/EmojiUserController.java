package hello;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@Controller
public class EmojiUserController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    private final EmojiUserService service;

    private AuthenticationManager authManager;

    @Autowired
    public EmojiUserController(EmojiUserService service, AuthenticationManager authManager) {
        this.service = service;
        this.authManager = authManager;
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

    @RequestMapping(value = "/user-details", method = RequestMethod.POST)
    @ResponseBody
    public EmojiUser userDetailUpdate(@RequestBody UpdateProfileDto updateProfileDto,
                                      final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        EmojiUser me = this.service.findByName(authentication.getName());
        if(updateProfileDto.getCountry() != null) {
            me.setCountry(updateProfileDto.getCountry());
        }
        return service.updateProfile(me);
    }

    @RequestMapping(value = "/user-profile/{userid}", method = RequestMethod.GET)
    @ResponseBody
    public EmojiUser userProfile(final HttpServletRequest request, @PathVariable("userid") Long userid) {
        EmojiUser user = this.service.getById(userid);
        return user;
    }

    @RequestMapping(value = "/username-lookup/{username}", method = RequestMethod.GET)
    @ResponseBody
    public EmojiUser userProfile(final HttpServletRequest request, @PathVariable("username") String username) {
        return this.service.findByName(username);
    }

    @RequestMapping(value = "/add-friend", method = RequestMethod.POST)
    @ResponseBody
    public AddFriendDto addFriend( @RequestBody AddFriendDto addFriendDto, final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.service.addFriend(authentication.getName(), addFriendDto.username);
        return addFriendDto;
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    @ResponseBody
    public Authentication userLogin( @RequestBody LoginDto loginDto, final HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authReq
                = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        Authentication auth = authManager.authenticate(authReq);
        if (!auth.isAuthenticated()) {
            return auth;
        }
        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        HttpSession session = request.getSession(true);
        session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
        return auth;
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

    static class LoginDto {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    static class UpdateProfileDto {
        private String country;

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }
    }
}
