package net.linkednest.share.repository;

import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoardCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShareBoardCategoryRepository extends JpaRepository<ShareBoardCategory, Long> {
    List<ShareBoardCategory> findAllByUser(User user);
    Optional<ShareBoardCategory>  findById(Long id);
    Page<ShareBoardCategory> findByIdLessThan(Long id, Pageable pageable);
    Page<ShareBoardCategory> findByIdGreaterThan(Long id, Pageable pageable);

}
