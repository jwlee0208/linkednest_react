package net.linkednest.openapi.outer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.openapi.outer.dto.SearchCommonApiDto;
import net.linkednest.openapi.outer.service.SlideshareApiService;
import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.social.slideshare.api.domain.Slideshow;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/slideshare")
@RequiredArgsConstructor
public class SlideshareApiController {
    private final SlideshareApiService slideshareApiService;

    @PostMapping(value = "/slideList")
    public ResponseEntity getSlideList(SearchCommonApiDto searchCommonApiDto) {
        String          keyword         = searchCommonApiDto.getKeyword();
        List<Slideshow> slideList       = null;
        JSONObject      resObj          = new JSONObject();
        if(StringUtils.isNotEmpty(keyword)){
            slideList       = this.slideshareApiService.searchSlideshowList(keyword);
        }
        resObj.put("slideList", slideList);
        return ResponseEntity.ok(resObj);
    }
}
