/*
package com.example.demo2rest.configs;

import com.example.demo2rest.entities.Authority;
import com.example.demo2rest.entities.TheUser;
import com.example.demo2rest.repositories.AuthorityRepository;
import com.example.demo2rest.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    private AuthorityRepository authorityRepository;

    @Autowired
    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TheUser theUser = this.userRepository.findByUsername(username);
        Authority authority = authorityRepository.findByUsername(username);

        return (UserDetails) new User(theUser.getUsername(), theUser.getPassword(),
                AuthorityUtils.createAuthorityList(authority.getAuthority()));
    }
}
*/
