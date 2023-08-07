import { useEffect, useState } from "react";
import { axiosInstance } from "../../../..";
import { ShareBoardArticleList_ } from "../../../../store/modules/share";
import ShareNormalBoardArticleList from "../../../function/share/ShareNormalBoardArticleList";

function ShareUser  () {

    useEffect(() => {
        /* axiosInstance.post('/api/share/board/article/list/71',
            JSON.stringify({
                offset  : 0,
                limit   : 10,
            })
        ).then(res => {
            setupShareBoardArticleList(res.data.shareBoardArticleList);
            setTotalPages(res.data.totalPages);
        }).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        )); */
    },[]);

    return (
        <ShareNormalBoardArticleList/>
    )
}

export default ShareUser;