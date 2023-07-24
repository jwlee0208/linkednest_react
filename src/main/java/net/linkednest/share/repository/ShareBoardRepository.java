package net.linkednest.share.repository;

import net.linkednest.share.entity.ShareBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareBoardRepository extends JpaRepository<ShareBoard, Long> {
}
