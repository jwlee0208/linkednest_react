package net.linkednest.common.repository.auth;

import jakarta.transaction.Transactional;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.entity.user.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Transactional
public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {

    Optional<UserRefreshToken> findByRefreshToken(String refreshToken);
    Optional<UserRefreshToken> findByUser(User user);

}
