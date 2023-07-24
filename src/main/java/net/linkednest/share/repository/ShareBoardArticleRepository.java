package net.linkednest.share.repository;

import net.linkednest.share.entity.ShareBoardArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareBoardArticleRepository extends JpaRepository<ShareBoardArticle, Long> {
}
