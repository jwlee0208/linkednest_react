package net.linkednest.www.repository;

import jakarta.transaction.Transactional;
import net.linkednest.common.entity.User;
import net.linkednest.common.entity.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Transactional
public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {

    Optional<UserRefreshToken> findByRefreshToken(String refreshToken);
    Optional<UserRefreshToken> findByUser(User user);

}
