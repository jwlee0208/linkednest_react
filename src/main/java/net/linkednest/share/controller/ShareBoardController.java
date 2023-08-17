package net.linkednest.share.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.share.dto.ReqShareBoardDto;
import net.linkednest.share.dto.ResShareBoardDto;
import net.linkednest.share.dto.ResShareBoardPagingDto;
import net.linkednest.share.service.ShareBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/share/board")
public class ShareBoardController {
    private final ShareBoardService shareBoardService;

    @RequestMapping(value = "/list/{offset}/{limit}",  method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<ResShareBoardPagingDto> getShareBoardList(HttpServletRequest request, ReqShareBoardDto reqShareBoardDto, @PathVariable int offset, @PathVariable int limit) {
        return ResponseEntity.ok(shareBoardService.getShareBoardListBySearchCondition(request, offset, limit, reqShareBoardDto.getId()));
    }

    @GetMapping(value = "/{shareBoardId}")
    public ResponseEntity<ResShareBoardDto> getShareBoard(@PathVariable Long shareBoardId) {
        return ResponseEntity.ok(shareBoardService.getShareBoard(shareBoardId));
    }

}
