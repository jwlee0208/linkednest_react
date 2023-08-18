package net.linkednest.share.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.share.dto.ReqShareBoardCategoryDto;
import net.linkednest.share.dto.ResShareBoardCategoryListDto;
import net.linkednest.share.entity.ShareBoardCategory;
import net.linkednest.share.service.ShareBoardCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/share/board/category")
public class ShareBoardCategoryController {
    private final ShareBoardCategoryService shareBoardCategoryService;

    @PostMapping(value = "/list")
    public ResponseEntity getShareBoardCategoryList(ReqShareBoardCategoryDto reqShareBoardCategoryDto) {
        List<ShareBoardCategory> shareBoardCategoryList = shareBoardCategoryService.getShareBoardCategoryList(reqShareBoardCategoryDto);
        log.info("[{}.{}] shareBoardCategoryList : {}", this.getClass().getName(), "getShareBoardCategoryList", shareBoardCategoryList);
        ResShareBoardCategoryListDto resShareBoardCategoryListDto = new ResShareBoardCategoryListDto();
        if (shareBoardCategoryList != null) {
            resShareBoardCategoryListDto.setReturnCode(10000);
            resShareBoardCategoryListDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
            resShareBoardCategoryListDto.setShareBoardCategoryList(shareBoardCategoryList);
        } else {
            resShareBoardCategoryListDto.setReturnCode(40000);
            resShareBoardCategoryListDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
        }
        return ResponseEntity.ok(resShareBoardCategoryListDto);
    }
}
