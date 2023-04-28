package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.content.ResContentCategoryDto;
import net.linkednest.common.entity.content.ContentCategory;
import net.linkednest.common.repository.ContentCategoryRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContentCategoryService {

    private final ContentCategoryRepository contentCategoryRepository;

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
                ResContentCategoryDto resContentCategoryObj = new ResContentCategoryDto();
                resContentCategoryObj.setCategoryCode(contentCategory.getCategoryCode());
                resContentCategoryObj.setCategoryName(contentCategory.getCategoryName());
                resContentCategoryObj.setId(contentCategory.getId());
                resContentCategoryObj.setDepth(contentCategory.getDepth());
                resContentCategoryObj.setIsActive(contentCategory.getIsActive());
                resContentCategoryObj.setParentId(contentCategory.getParentId());
                resContentCategoryObj.setChildCategoryList(this.getRecursiveContentCategoryList(contentCategory.getId()));
                resContentCategoryList.add(resContentCategoryObj);
            }
        }
        return resContentCategoryList;
    }
}
