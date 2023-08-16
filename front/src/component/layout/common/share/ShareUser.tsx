import { useEffect }                    from "react";
import { useDispatch }                  from "react-redux";
import { useLocation, useParams }       from "react-router";
import { axiosInstance }                from "../../../..";
import shareSlice                       from "../../../../store/modules/share";
import ShareNormalBoardArticleList      from "../../../function/share/ShareNormalBoardArticleList";
import ShareMansonryBoardArticleList    from "../../../function/share/ShareMansonryBoardArticleList";

function ShareUser () {

    const params   = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const shareUserId           = params.userId;    
    const shareBoardId          = params.shareBoardId;
    const shareBoardCategoryId  = params.shareBoardCategoryId;
    const shareBoardType        = (location.state !== null ? location.state.shareBoardType : '0');

    useEffect(() => {
        if (shareUserId !== null && shareUserId !== undefined) {
            axiosInstance.get(`/api/share/${shareUserId}`)
                .then(res => {
                    dispatch(shareSlice.actions.setShareInfo(res.data));
                })
        }    
    }, [shareUserId]);

    const viewArea = () => {
        switch(shareBoardType) {
            case '1': return (
                <ShareMansonryBoardArticleList 
                                            shareBoardId={shareBoardId as unknown as string} 
                                            shareUserId={shareUserId as unknown as string} 
                                            shareBoardCategoryId={shareBoardCategoryId as unknown as string}
                                            alertOnBottom={true}/>
            )        
            default : return <ShareNormalBoardArticleList/>    
        }
    }

    return (
        viewArea()
    )
}

export default ShareUser;