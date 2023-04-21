package net.linkednest.common.repository.user;

import net.linkednest.common.entity.user.User;
import net.linkednest.common.entity.user.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByUser(User user);

}
