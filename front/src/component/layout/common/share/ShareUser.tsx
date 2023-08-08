import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { axiosInstance } from "../../../..";
import shareSlice from "../../../../store/modules/share";
import ShareNormalBoardArticleList from "../../../function/share/ShareNormalBoardArticleList";

function ShareUser () {

    const params      = useParams();
    const shareUserId = params.userId;    
    const dispatch    = useDispatch();

    useEffect(() => {
        if (shareUserId !== null && shareUserId !== undefined) {
            axiosInstance.get(`/api/share/${shareUserId}`)
                .then(res => {
                    dispatch(shareSlice.actions.setShareInfo(res.data));
                })
        }    
    }, [shareUserId]);

    return (
        <ShareNormalBoardArticleList/>
    )
}

export default ShareUser;