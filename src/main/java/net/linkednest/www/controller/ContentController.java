package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import net.linkednest.common.dto.content.ResContentDto;
import net.linkednest.www.service.ContentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/content")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping(value="/list")
    public ResponseEntity<List<ResContentDto>> getContentList() {
        return ResponseEntity.ok(this.contentService.getContentAllList());
    }

    @GetMapping(value = "/{contentCode}")
    public ResponseEntity<ResContentDto> getContent(@PathVariable(name = "contentCode") String contentCode) {
        return ResponseEntity.ok(this.contentService.getContentByContentCode(contentCode));
    }
}
