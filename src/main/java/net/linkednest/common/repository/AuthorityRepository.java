package net.linkednest.common.repository;

import net.linkednest.common.entity.Authority;
import net.linkednest.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

    List<Authority> findAll();
    List<Authority> findAllByUser(User user);
    int deleteAllByUser(User user);
}
