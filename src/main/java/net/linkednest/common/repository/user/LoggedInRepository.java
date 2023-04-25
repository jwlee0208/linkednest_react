package net.linkednest.common.repository.user;

import net.linkednest.common.entity.user.LoggedIn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggedInRepository extends JpaRepository<LoggedIn, Long> {
}
