package net.linkednest.openapi.outer.controller;

import com.google.api.services.youtube.model.SearchResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.openapi.outer.dto.SearchCommonApiDto;
import net.linkednest.openapi.outer.service.YoutubeApiService;
import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/youtube")
@RequiredArgsConstructor
public class YoutubeApiController {
    private final YoutubeApiService youtubeApiService;

    @PostMapping(value = "/streamList")
    public ResponseEntity searchStreamList(SearchCommonApiDto searchCommonApiDto) {
        String              keyword          = searchCommonApiDto.getKeyword();
        List<SearchResult>  searchResultList = null;
        JSONObject          resObj           = new JSONObject();
        if(StringUtils.isNotEmpty(keyword)){
            searchResultList = this.youtubeApiService.searchStreamList(keyword);
        }
        resObj.put("type"       , searchCommonApiDto.getType());
        resObj.put("streamList" , searchResultList);
        return ResponseEntity.ok(resObj);
    }
}
