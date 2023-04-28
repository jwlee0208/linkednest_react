package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import net.linkednest.common.dto.content.ResContentCategoryDto;
import net.linkednest.www.service.ContentCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/content/category")
public class ContentCategoryController {
    private final ContentCategoryService contentCategoryService;

    @GetMapping(value = "/list")
    public ResponseEntity<List<ResContentCategoryDto>> getContentCategoryList() throws Exception {
        return ResponseEntity.ok(contentCategoryService.getRecursiveContentCategoryList(null));
    }

    @GetMapping(value = "/detail/{categoryCode}")
    public ResponseEntity<ResContentCategoryDto> getContentCategoryInfo(@PathVariable String categoryCode) throws Exception {
        return ResponseEntity.ok(contentCategoryService.getContentCategoryInfo(categoryCode));
    }

}
