package pl.umcs.springlibrarybackend.service;

import pl.umcs.springlibrarybackend.model.authDto.LoginDto;
import pl.umcs.springlibrarybackend.model.authDto.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}
