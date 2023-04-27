package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.content.ResContentCreator;
import net.linkednest.common.dto.content.ResContentDto;
import net.linkednest.common.dto.content.ResContentSnsDto;
import net.linkednest.common.entity.content.Content;
import net.linkednest.common.entity.content.ContentCreator;
import net.linkednest.common.repository.ContentRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    public List<ResContentDto> getContentAllList() {
        List<ResContentDto> resList = new ArrayList<>();
        contentRepository.findAllByIsActive(true).forEach(c -> {
            resList.add(this.getContent(c));
        });
        return resList;
    }

    public ResContentDto getContentByContentCode(String contentCode) {
        ResContentDto resObj = new ResContentDto();
        Optional<Content> contentOptional = contentRepository.findByContentCode(contentCode);
        return this.getContent(contentOptional);
    }
    private ResContentDto getContent(Optional<Content> contentOptional) {
        if (contentOptional.isPresent()) {
            Content content = contentOptional.get();
            return this.getContent(content);
        }
        return null;
    }
    private ResContentDto getContent(Content content) {
        ResContentDto resObj = new ResContentDto();
        if (ObjectUtils.isNotEmpty(content)) {
            resObj.setContentId(content.getId());
            resObj.setContentDesc(content.getContentDesc());
            resObj.setContentCode(content.getContentCode());
            resObj.setContentName(content.getContentName());
            resObj.setContentType(content.getContentType());
            resObj.setLayoutType(content.getLayoutType());
            resObj.setStatus(content.getStatus());
            resObj.setUsableLevel(content.getUsableLevel());
            resObj.setIsActive(content.getIsActive());
            if (ObjectUtils.isNotEmpty(content.getContentCategory())) {
                resObj.setContentCategoryCode(content.getContentCategory().getCategoryCode());
            }
            resObj.setHomepageUrl(content.getHomepageUrl());
            resObj.setImagePath(content.getImagePath());
            resObj.setLogoImagePath(content.getLogoImagePath());
            List<ResContentSnsDto> resContentSnsList = new ArrayList<>();
            content.getContentSnsList().forEach(cs -> {
                ResContentSnsDto resContentSnsObj = new ResContentSnsDto();
                resContentSnsObj.setContentSnsId(cs.getId());
                resContentSnsObj.setContent(cs.getContent());
                resContentSnsObj.setSnsType(cs.getSnsType());
                resContentSnsObj.setSnsUrl(cs.getSnsUrl());
                resContentSnsList.add(resContentSnsObj);
            });
            resObj.setContentSnsList(resContentSnsList);

            ContentCreator contentCreator = content.getContentCreator();
            if (ObjectUtils.isNotEmpty(contentCreator)) {
                ResContentCreator resContentCreator = new ResContentCreator();
                resContentCreator.setCreatorId(contentCreator.getId());
                resContentCreator.setCreatorName(contentCreator.getCreaterName());
                resContentCreator.setCreatorRights(contentCreator.getCreaterRights());
                resContentCreator.setCreatorImgUrl(contentCreator.getCreaterImgUrl());
                resObj.setContentCreator(resContentCreator);
            }
        }
        return resObj;
    }
}
