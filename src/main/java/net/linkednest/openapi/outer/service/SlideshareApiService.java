package net.linkednest.openapi.outer.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.social.slideshare.api.SlideShare;
import org.springframework.social.slideshare.api.SlideshowOperations;
import org.springframework.social.slideshare.api.domain.SearchOptions;
import org.springframework.social.slideshare.api.domain.SearchSlideshowsResponse;
import org.springframework.social.slideshare.api.domain.Slideshow;
import org.springframework.social.slideshare.api.impl.SlideShareTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class SlideshareApiService {
    @Value("${slideshare.api.key}")
    private String apiKey;
    @Value("${slideshare.shared.secret}")
    private String sharedSecret;

    /**
     * @brief slideshare List 조회
     */
    public List<Slideshow> searchSlideshowList(String searchText){
        SlideShare                  slideshare               = new SlideShareTemplate(apiKey, sharedSecret);
        SlideshowOperations         slideshowOperations      = slideshare.slideshowOperations();
        List<Slideshow>             slideshowList            = null;

        if(StringUtils.isNotEmpty(searchText)){
            SearchSlideshowsResponse    searchSlideshowsResponse = slideshowOperations.searchSlideshows(searchText, 1, 5, SearchOptions.Language.All, SearchOptions.Sort.MOSTVIEWED, SearchOptions.UploadDate.YEAR, SearchOptions.SearchType.TEXT, true, SearchOptions.FileFormat.PPT, SearchOptions.FileType.PRESENTATIONS, false, false, false, false, false);
            if(searchSlideshowsResponse.getNumResults() > 0){
                slideshowList   = searchSlideshowsResponse.getSlideshows();
            }
        }
        return slideshowList;
    }

}
