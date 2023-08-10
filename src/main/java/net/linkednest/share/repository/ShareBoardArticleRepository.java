package net.linkednest.share.repository;

import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoard;
import net.linkednest.share.entity.ShareBoardArticle;
import net.linkednest.share.entity.ShareBoardCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareBoardArticleRepository extends JpaRepository<ShareBoardArticle, Long> {
    Page<ShareBoardArticle> findAllByCreateUserAndStatus(User user, int status, Pageable pageable);
    Page<ShareBoardArticle> findAllByShareBoardCategoryAndCreateUserAndStatus(ShareBoardCategory shareBoardCategory, User user, int status, Pageable pageable);
    Page<ShareBoardArticle> findAllByShareBoardAndCreateUserAndStatus(ShareBoard shareBoard, User user, int status, Pageable pageable);
}
