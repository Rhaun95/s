package com.example.demo.config;

import com.example.demo.jwt.JwtAccessDeniedHandler;
import com.example.demo.jwt.JwtAuthenticationEntryPoint;
import com.example.demo.jwt.JwtSecurityConfig;
import com.example.demo.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;


@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) //PreAuthorize 어노테이션 활성화
public class SecurityConfig {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CorsFilter corsFilter;

    // jwt 패키지에 있는 클래스 값을 주입받음
    public SecurityConfig(
            TokenProvider tokenProvider,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAccessDeniedHandler jwtAccessDeniedHandler,
            CorsFilter corsFilter) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.corsFilter = corsFilter;
    }
    
    //PasswordEncoderder는 BCryptPasswordEncoder 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //H2-console 하위 모든 요청과 파피콘은 모두 무시함
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/h2-console/**"
                , "/favicon.ico"
                , "/error");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
                .csrf().disable()

                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // enable h2-console
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

//                // 세션을 사용하지 않기 때문에 STATELESS로 설정
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // permitAll 인증 없이 접근 허용
                .and()
                .authorizeRequests()
                .antMatchers("/api/hello").permitAll()
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/api/signup").permitAll()
                .antMatchers("/api/boards").permitAll()
                .antMatchers("/api/te").permitAll()
                .antMatchers("/api/abc").permitAll()
                .antMatchers("/movie").permitAll()
                .antMatchers("/api/abc").permitAll()
                .antMatchers("/api/{id}").permitAll()
                .antMatchers("/api/user").permitAll()
                .antMatchers("/api/").permitAll()
                .antMatchers("/store").permitAll()
                .antMatchers("/movie/search").permitAll()
                .antMatchers("/movie/{id}").permitAll()
                .antMatchers("/movie/{id}/still1").permitAll()
                .antMatchers("/movie/{id}/still2").permitAll()
                .antMatchers("/movie/{id}/still3").permitAll()
                .antMatchers("/cinema").permitAll()

                .antMatchers("/basket/").permitAll()
                .antMatchers("/basket/add").permitAll()
                .antMatchers("/basket/seatsize").permitAll()

                .antMatchers("/basket/{id}").permitAll()

                .antMatchers("/itembasket").permitAll()
                .antMatchers("/itembasket/").permitAll()
                .antMatchers("/itembasket/{id}").permitAll()
                .antMatchers("/itembasket/insert").permitAll()

                .antMatchers("/thunder").permitAll()
                .antMatchers("/thunder/").permitAll()
                .antMatchers("/thunder/{id}").permitAll()
                .antMatchers("/thunder/select/{username}").permitAll()
                .antMatchers("/thunder/selectlocation/{location}").permitAll()
                .antMatchers("/thunder/selectcategory/{category}").permitAll()

                .antMatchers("/thunder/{category}{location}{username}").permitAll()
                .antMatchers("/thunder/insert").permitAll()

                .antMatchers("/thunderinsert").permitAll()

                .antMatchers("/seat").permitAll()
                .antMatchers("/Bo/board").permitAll()

//                .antMatchers("/api/test").permitAll()


                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider))
//
                .and()
                .cors()
                ;
        return httpSecurity.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer(){
          @Override
          public void addCorsMappings(CorsRegistry registry){
              registry.addMapping("/**")
                      .allowedOrigins("http://localhost:3000");
          }

        };
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POSTT", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource(){
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.addAllowedOriginPattern("*");
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}




//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    //H2-console 하위 모든 요청과 파피콘은 모두 무시함
//    //
//    @Override
//    public void configure(WebSecurity web){
//        web
//                .ignoring()
//                .antMatchers(
//                        "/h2-console/**"
//                        ,"/favicon.ico"
//                );
//    }
//
//
//    @Override
//    protected void configure(HttpSecurity http) throws  Exception{
//        http
//                .authorizeRequests() //HttpServletRequest를 사용하는 요청들에 대한 접근 제한
//                .antMatchers("/api/hello").permitAll() //permitAll 인증 없이 접근 허용
//                .anyRequest().authenticated(); //나머지는 인증을 받아야함
//    }
//}
