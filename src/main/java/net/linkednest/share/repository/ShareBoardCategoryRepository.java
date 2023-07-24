package net.linkednest.share.repository;

import net.linkednest.share.entity.ShareBoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareBoardCategoryRepository extends JpaRepository<ShareBoardCategory, Long> {
}
