package net.linkednest.share.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.share.dto.ReqShareBoardDto;
import net.linkednest.share.dto.ResShareBoardDto;
import net.linkednest.share.entity.ShareBoard;
import net.linkednest.share.service.ShareBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/share/board")
public class ShareBoardController {
    private ShareBoardService shareBoardService;

    @RequestMapping(value = "/list/{offset}/{limit}",  method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<ResShareBoardDto> getShareBoardList(HttpServletRequest request, ReqShareBoardDto reqShareBoardDto, int offset, int limit) {
        return ResponseEntity.ok(shareBoardService.getShareBoardListBySearchCondition(request, offset, limit, reqShareBoardDto.getId()));
    }



}
