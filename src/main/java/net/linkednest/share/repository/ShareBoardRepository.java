package net.linkednest.share.repository;

import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShareBoardRepository extends JpaRepository<ShareBoard, Long> {

    Slice<ShareBoard> findAllByCreateUser(User user, Sort sort);
    Slice<ShareBoard> findAllByIdOrCreateUser(Long id, User user, Pageable pageable);
    Optional<ShareBoard> findById(Long id);
    Page<ShareBoard> findByIdLessThan(Long id, Pageable pageable);
    Page<ShareBoard> findByIdGreaterThan(Long id,Pageable pageable);
}
