import { useAppDispatch } from "../../../store/index.hooks";
import { asyncGetUser } from "../../../store/modules/user";

function Mypage() {
  const dispatch = useAppDispatch();

  const res = dispatch(asyncGetUser()); 
  console.log('[mypage] res : ' + JSON.stringify(res.arg));
 
    return (
      <div className="Mypage">
          Mypage Area
      </div>
    );
}
  
export default Mypage;
  