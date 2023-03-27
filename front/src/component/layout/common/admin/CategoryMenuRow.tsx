import { adminMenuCategory, adminMenus } from "../../../../store/modules/adminMenu";
import { Box, Divider, ListItemText, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

type MenuRowProps = {
    menuCategoryId : number,
    menuCategoryName : string,
    menusArr : adminMenus
};

function CategoryMenuRow({
    menuCategoryId,
    menuCategoryName,
    menusArr
} : MenuRowProps) {

    const navigate = useNavigate();

    const handleToClickMenu = (param : string, e : React.MouseEvent) => {
        e.preventDefault();
        navigate(param);
    }

    return (
       <> 
            <MenuItem>
                <ListItemText>
                    <Typography variant="h5" color="primary">{menuCategoryName}</Typography>
                </ListItemText>
            </MenuItem>
            <Divider/>
    {
        menusArr.map(menu => (
            <MenuItem>
                <ListItemText onClick={(e) => handleToClickMenu(`${menu.menuUrl}`, e)}>{menu.menuName}</ListItemText>
            </MenuItem>        
        ))        
    }
        </>
    )
}

export default CategoryMenuRow;