package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import net.linkednest.www.service.ContentCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/content/category")
public class ContentCategoryController {

    private final ContentCategoryService contentCategoryService;

    @GetMapping(value = "/list")
    public ResponseEntity getContentCategoryList() throws Exception {
        return ResponseEntity.ok(contentCategoryService.getRecursiveContentCategoryList(null));
    }

}
