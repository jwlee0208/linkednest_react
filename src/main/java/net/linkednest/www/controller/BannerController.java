package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import net.linkednest.common.dto.ResBanner;
import net.linkednest.www.service.BannerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/banner")
public class BannerController {
    private final BannerService bannerService;
    @GetMapping(value = "/list/{contentCode}")
    public ResponseEntity<List<ResBanner>> getBannerListForContent(@PathVariable String contentCode) {
        return ResponseEntity.ok(bannerService.getBannerListForContent(contentCode));
    }
}
