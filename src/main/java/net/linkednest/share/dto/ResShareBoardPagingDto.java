package net.linkednest.share.dto;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;
import org.springframework.data.domain.Sort;

import java.util.List;

@Data
public class ResShareBoardPagingDto<T> extends CommonResDto {
    private int number;
    private int size;
    private int numberOfElements;
    private List<T> content;
    private Sort sort;
    private boolean isFirst;
    private boolean isLast;
    private boolean hasNext;
    private boolean hasPrevious;
}
