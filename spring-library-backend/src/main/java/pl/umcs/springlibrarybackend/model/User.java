package pl.umcs.springlibrarybackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    @NotBlank(message = "ID cannot be blank")
    @Size(min=36, max=36, message = "ID must be 36 characters long")
    private String id;

    @Column(name = "full_name", nullable = false)
    @NotBlank(message = "Full name cannot be blank")
    @Size(min=3, max=50, message = "Full name must be between 3 and 50 characters")
    private String fullName;

    @Column(name = "email", nullable = false, unique = true)
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format")
    private String email;

    @Column(name = "avatar_url")
    @Size(max=255, message = "Avatar URL must be less than 255 characters")
    private String avatarUrl;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Password cannot be blank")
    @Size(min=8, message = "Password must be at least 8 characters long")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;
}
