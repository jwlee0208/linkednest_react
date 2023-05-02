package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.content.ResContentCategoryDto;
import net.linkednest.common.dto.content.ResContentDto;
import net.linkednest.common.entity.content.Content;
import net.linkednest.common.entity.content.ContentCategory;
import net.linkednest.common.repository.ContentCategoryRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContentCategoryService {

    private final ContentCategoryRepository contentCategoryRepository;
    private final ContentService contentService;

    public List<ContentCategory> getContentCategoryList(Long parentId) {
        Boolean isExistParentId = ObjectUtils.isNotEmpty(parentId) && parentId > 0L;
        List<ContentCategory> contentCategoryList = (isExistParentId)
                                ? contentCategoryRepository.findAllByParentId(parentId)
                                    : contentCategoryRepository.findAllByDepth(1);
        return contentCategoryList;
    }

    public List<ResContentCategoryDto> getRecursiveContentCategoryList(Long parentId) throws Exception{
        List<ResContentCategoryDto> resContentCategoryList = new ArrayList<>();
        List<ContentCategory> contentCategoryList = this.getContentCategoryList(parentId);
        if (!CollectionUtils.isEmpty(contentCategoryList)) {
            for(ContentCategory contentCategory : contentCategoryList) {
                resContentCategoryList.add(this.getContentCategory(contentCategory));
            }
        }
        return resContentCategoryList;
    }

    public ContentCategory getContentCategory(String categoryCode) {
        Optional<ContentCategory> contentCategoryOptional = contentCategoryRepository.findByCategoryCode(categoryCode);
        ContentCategory contentCategory = null;
        if (contentCategoryOptional.isPresent()) {
            contentCategory = contentCategoryOptional.get();
        }
        return contentCategory;
    }

    public ResContentCategoryDto getContentCategoryInfo(String categoryCode) throws Exception {

        ContentCategory contentCategory = this.getContentCategory(categoryCode);
        return this.getContentCategory(contentCategory);
    }

    private ResContentCategoryDto getContentCategory(ContentCategory contentCategory) throws Exception {
        ResContentCategoryDto resContentCategoryObj = new ResContentCategoryDto();
        resContentCategoryObj.setCategoryCode(contentCategory.getCategoryCode());
        resContentCategoryObj.setCategoryName(contentCategory.getCategoryName());
        resContentCategoryObj.setId(contentCategory.getId());
        resContentCategoryObj.setDepth(contentCategory.getDepth());
        resContentCategoryObj.setIsActive(contentCategory.getIsActive());
        resContentCategoryObj.setParentId(contentCategory.getParentId());
        resContentCategoryObj.setChildCategoryList(this.getRecursiveContentCategoryList(contentCategory.getId()));

        List<Content> contentList = contentService.getContentListByCategory(contentCategory);
        List<ResContentDto> resContentList = new ArrayList<>();
        if (!CollectionUtils.isEmpty(contentList)) {
            contentList.forEach(content -> {
                resContentList.add(contentService.getContent(content));
            });
            resContentCategoryObj.setContentList(resContentList);
        }

        return resContentCategoryObj;
    }

}
