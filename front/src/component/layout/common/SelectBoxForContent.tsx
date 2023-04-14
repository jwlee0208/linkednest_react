import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ContentList_ } from "../../../store/modules/content";
import { useNavigate } from "react-router";

type SelectBoxProps = {
    contentCode : string,
    contentList : ContentList_
}
function SelectBoxForContent({
    contentCode,
    contentList,
} : SelectBoxProps) {

    const navigate = useNavigate();
    const handleMoveType = (e : SelectChangeEvent) => {
        e.preventDefault();
        const typeIdVal = e.target.value;
        navigate(`/${typeIdVal}`);
    }

    return (
        <>
              <InputLabel id="demo-simple-select-standard-label">Type List</InputLabel>
                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" label="Type List" onChange={handleMoveType} value={contentCode}>
            {
              contentList.map(content => (
                <MenuItem key={content.contentId} value={content.contentCode}>{content.contentName}</MenuItem>
              ))
            }  
                </Select>
        
        </>
    )
}

export default SelectBoxForContent;