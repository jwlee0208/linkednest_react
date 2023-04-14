package net.linkednest.common.repository;

import jakarta.transaction.Transactional;
import net.linkednest.common.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);

}