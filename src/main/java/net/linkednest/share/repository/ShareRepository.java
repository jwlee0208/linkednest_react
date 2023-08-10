package net.linkednest.share.repository;

import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.Share;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShareRepository extends JpaRepository<Share, Long> {
    Optional<Share> findByUser(User user);

}
