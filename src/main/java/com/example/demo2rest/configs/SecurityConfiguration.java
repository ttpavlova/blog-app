package com.example.demo2rest.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.sql.DataSource;
import java.security.Principal;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
    /*@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                                .antMatchers("/static/").permitAll()
                *//*.antMatchers("/static/**").permitAll()*//*
                                .anyRequest().authenticated()
                )
                .formLogin((form) -> form
                        .loginPage("/login")
                        .permitAll()
                )
                .logout((logout) -> logout.permitAll());
                *//*.logoutSuccessUrl("/");*//*

        return http.build();
    }*/
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/static/").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .defaultSuccessUrl("/", true)
                .permitAll()
                .and()
                .httpBasic()
                .and()
                .csrf().disable()
                .logout()
                .logoutSuccessUrl("/");
    }

    // In-Memory
    /*@Bean
    public UserDetailsService users() {
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2a$12$q29eD1ktZN9OalGUOhykz.qwSq7u0Is6pXIP2FGV3rrNMx.M4lWl.")
                .roles("ADMIN", "USER")
                .build();
        UserDetails user = User.builder()
                .username("user")
                .password("{bcrypt}$2a$12$q29eD1ktZN9OalGUOhykz.qwSq7u0Is6pXIP2FGV3rrNMx.M4lWl.")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }*/

    // db authentication
    @Bean
    public JdbcUserDetailsManager users(DataSource dataSource) {
        UserDetails admin = User.builder()
                .username("admin")
                .password("{bcrypt}$2a$12$q29eD1ktZN9OalGUOhykz.qwSq7u0Is6pXIP2FGV3rrNMx.M4lWl.")
                .roles("ADMIN", "USER")
                .build();
        UserDetails user = User.builder()
                .username("user")
                .password("{bcrypt}$2a$12$q29eD1ktZN9OalGUOhykz.qwSq7u0Is6pXIP2FGV3rrNMx.M4lWl.")
                .roles("USER")
                .build();
        UserDetails user2 = User.builder()
                .username("user2")
                .password("{bcrypt}$2a$12$q29eD1ktZN9OalGUOhykz.qwSq7u0Is6pXIP2FGV3rrNMx.M4lWl.")
                .roles("USER")
                .build();
        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
        if (!users.userExists(admin.getUsername())) {
            users.createUser(admin);
        }
        if(!users.userExists(user.getUsername())) {
            users.createUser(user);
        }
        if(!users.userExists(user2.getUsername())) {
            users.createUser(user2);
        }

        return users;
    }
}
