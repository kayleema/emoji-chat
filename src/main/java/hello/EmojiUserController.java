package hello;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
    public Authentication userDetails(final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication;
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    @ResponseBody
    public Authentication userLogin(final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication;
    }
}
