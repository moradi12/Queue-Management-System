package Queue.management.system.example.management.system.Controllers;

import Queue.management.system.example.management.system.Beans.Credentials;
import Queue.management.system.example.management.system.Beans.UserDetails;
import Queue.management.system.example.management.system.Exceptions.AdminExceptions.AdminSystemException;
import Queue.management.system.example.management.system.Exceptions.PatientExceptions.PatientSystemException;
import Queue.management.system.example.management.system.Service.LoginService;
import Queue.management.system.example.management.system.utills.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
    private final LoginService loginService;
    private final JWT jwt;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDetails userDetails) {
        System.out.println("Received user details for registration: " + userDetails);
        try {
            String token = loginService.register(userDetails);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            return new ResponseEntity<>(token, headers, HttpStatus.CREATED);
        } catch (LoginException | AdminSystemException | PatientSystemException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Credentials credentials) {
        try {
            UserDetails user = loginService.loginUser(credentials);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + jwt.generateToken(user));
            Map<String, Object> map = new HashMap<>();
            map.put("id", user.getUserId());
            map.put("userName", user.getUserName());
            return new ResponseEntity<>(map, headers, HttpStatus.CREATED);
        } catch (LoginException | PatientSystemException | AdminSystemException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + e.getMessage());
        }
    }
}
