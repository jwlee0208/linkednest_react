import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { axiosInstance } from "../../../..";
import shareSlice, { ShareBoard_, getShareInfo } from "../../../../store/modules/share";
import ShareImageBoardArticleList from "../../../function/share/ShareImageBoardArticleList";
import ShareNormalBoardArticleList from "../../../function/share/ShareNormalBoardArticleList";
import { useAppSelect } from "../../../../store/index.hooks";

function ShareUser () {

    const params   = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const shareUserId           = params.userId;    
    const shareBoardId          = params.shareBoardId;
    const shareBoardCategoryId  = params.shareBoardCategoryId;
    const [shareBoardType, setShareBoardType]        = useState("");
    const [shareBoard, setShareBoard] = useState<ShareBoard_>({
        id                  : 0,
        boardName           : '',
        boardType           : '',
        createUserId        : '',
        createDate          : '',
        modifyUserId        : '',
        modifyDate          : '',
    });

    useEffect(() => {
        if (shareUserId !== null && shareUserId !== undefined) {
            axiosInstance.get(`/api/share/${shareUserId}`)
                .then(res => {
                    dispatch(shareSlice.actions.setShareInfo(res.data));
                })
        }    

        if (location.state !== null) {
            setShareBoardType(location.state.shareBoardType);
        } else {
            if (shareBoardId === undefined) {
                 setShareBoardType("0");
            } else  {
                axiosInstance.get(`/api/share/board/${shareBoardId}`)
                .then(res => {
                    setShareBoard(res.data);
                    setShareBoardType(res.data.boardType);
                })
            }
        }
    }, [shareUserId, shareBoardCategoryId, shareBoardId]);

    const viewArea = () => {
        switch(shareBoardType) {
            case '0': return <ShareNormalBoardArticleList/>        
            default : return (
                <ShareImageBoardArticleList 
                                            shareBoardId={shareBoardId as unknown as string} 
                                            shareUserId={shareUserId as unknown as string} 
                                            shareBoardCategoryId={shareBoardCategoryId as unknown as string}
                                            boardType={shareBoardType as unknown as string}
                                            alertOnBottom={true}/>    
            )
        }
    }

    return (
        viewArea()
    )
}

export default ShareUser;