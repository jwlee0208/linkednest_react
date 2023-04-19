package net.linkednest.www.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.ResBanner;
import net.linkednest.common.entity.banner.Banner;
import net.linkednest.common.entity.content.Content;
import net.linkednest.common.repository.BannerRepository;
import net.linkednest.common.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BannerService {
    private final BannerRepository bannerRepository;
    private final ContentRepository contentRepository;
    public List<ResBanner> getBannerListForContent(String contentCode) {
        List<ResBanner> resList = new ArrayList<>();
        Optional<Content> contentOptional = contentRepository.findByContentCode(contentCode);
        if (contentOptional.isPresent()) {
            Content content = contentOptional.get();
            List<Banner> bannerList = bannerRepository.findAllByContent(content);
            bannerList.stream().forEach(banner -> {
                ResBanner resBanner = new ResBanner();
                resBanner.setId(banner.getId());
                resBanner.setBannerName(banner.getBannerName());
                resBanner.setBannerDesc(banner.getBannerDesc());
                resBanner.setIsActive(banner.getIsActive());
                resBanner.setMainImageUrl(banner.getMainImageUrl());
                resBanner.setMidImageUrl(banner.getMidImageUrl());
                resBanner.setEtcImageUrl(banner.getEtcImageUrl());
                resBanner.setFromShowDate(banner.getFromShowDate());
                resBanner.setToShowDate(banner.getToShowDate());
                resBanner.setContentId(banner.getContent().getId());
                resList.add(resBanner);
            });
        }
        return resList;
    }
}
