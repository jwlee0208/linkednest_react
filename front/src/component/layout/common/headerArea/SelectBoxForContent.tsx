import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ContentList_ } from "../../../../store/modules/content";
import { useNavigate } from "react-router";
import { useEffect } from "react";

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

    useEffect(() => {

    }, [contentCode]);

    return (
        <FormControl>
              <InputLabel id="content-select-standard-label">Type List</InputLabel>
              <Select labelId="content-select-standard-label" id="content-select-standard" label="Type List" onChange={handleMoveType} value={contentCode}>
            {
              contentList.map(content => (
                <MenuItem key={content.contentId} value={content.contentCode}>{content.contentName}</MenuItem>
              ))
            }  
              </Select>        
        </FormControl>
    )
}

export default SelectBoxForContent;