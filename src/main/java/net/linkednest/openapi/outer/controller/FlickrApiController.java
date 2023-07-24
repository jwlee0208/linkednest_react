package net.linkednest.openapi.outer.controller;

import com.flickr4java.flickr.photos.Photo;
import com.flickr4java.flickr.photos.PhotoList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.openapi.outer.dto.SearchCommonApiDto;
import net.linkednest.openapi.outer.service.FlickrApiService;
import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/flickr")
public class FlickrApiController {
    private FlickrApiService flickrApiService;

    /**
     * flickr photo list
     *
     * @param searchCommonAPIDto
     * @return
     */
    @RequestMapping(value = "/photoList")
    public ResponseEntity getFlickrImageList(SearchCommonApiDto searchCommonAPIDto){
        String           keyword     = searchCommonAPIDto.getKeyword();
        PhotoList<Photo> photoList   = null;
        if(StringUtils.isNotEmpty(keyword)){
            photoList = this.flickrApiService.getPhotoList(keyword);
        }
        JSONObject resObj = new JSONObject();
        resObj.put("photoList", photoList);
        return ResponseEntity.ok(resObj);

    }

    /**
     * check for authentication
     *
     * @param authType
     * @return
     */
    @RequestMapping(value = "/checkAuth/{authType}")
    public ResponseEntity checkAuth(@PathVariable String authType) {
        return ResponseEntity.ok(this.flickrApiService.checkAuth());
    }
}
