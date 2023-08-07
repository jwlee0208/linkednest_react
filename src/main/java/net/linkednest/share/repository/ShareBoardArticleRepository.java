package net.linkednest.share.repository;

import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoardArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareBoardArticleRepository extends JpaRepository<ShareBoardArticle, Long> {
    Page<ShareBoardArticle> findAllByCreateUser(User user, Pageable pageable);

}
