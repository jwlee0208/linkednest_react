import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { ContentList_ } from "../../../../store/modules/content";

type SelectBoxProps = {
    contentCode : string,
    contentList : ContentList_
}
function SelectBoxForContent({
    contentCode,
    contentList,
} : SelectBoxProps) {

    const [contentCodeValue, setContentCodeValue] = useState(``);
    const handleMoveType = (e : SelectChangeEvent) => {
        e.preventDefault();
        const typeIdVal = e.target.value;
        window.location.href = `/${typeIdVal}`;
    }

    useEffect(() => {
        setContentCodeValue(`${contentCode}`);
    }, [contentCode]);

    return (
        <FormControl>
              <InputLabel id="content-select-standard-label">Type List</InputLabel>
              <Select labelId="content-select-standard-label" 
                      id="content-select-standard" 
                      label="Type List" 
                      onChange={handleMoveType} 
                      value={`${contentCodeValue}`}>
            {
              contentList.map(content => (
                <MenuItem key={`${content.contentId}`} value={`${content.contentCode}`}>{content.contentName}</MenuItem>
              ))
            }  
              </Select>        
        </FormControl>
    )
}

export default SelectBoxForContent;