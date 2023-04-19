package net.linkednest.common.repository;

import net.linkednest.common.entity.banner.Banner;
import net.linkednest.common.entity.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    List<Banner> findAllByContent(Content content);
}
