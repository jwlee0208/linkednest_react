import React                             from "react";
import { useNavigate }                   from "react-router";
import { RoleAccessPaths, User }         from "../../../../store/modules/user";
import { Divider, ListItemText, MenuItem, Typography } from "@mui/material";

type MenuRowProps = {
    menuCategoryId      : number,
    menuCategoryName    : string,
    menusArr            : RoleAccessPaths,
    user                : User,
};

function CategoryMenuRow({
    menuCategoryId,
    menuCategoryName,
    menusArr,
    user
} : MenuRowProps) {

    const navigate = useNavigate();

    const handleToClickMenu = (param : string, e : React.MouseEvent) => {
        e.preventDefault();
        navigate(param);
    }

    return (
       <> 
            <MenuItem key={"cat_"+menuCategoryId}>
              <ListItemText>
                    <Typography variant="h5" color="primary">{menuCategoryName}</Typography>
                </ListItemText>
            </MenuItem>
            <Divider/>
    {
        (menusArr !== null) ? (
            menusArr.filter(menu => menu.isShow === true)
                    .map(menu => (
                    <MenuItem key={"menu_" + menu.id}>
                        <ListItemText onClick={(e) => handleToClickMenu(`${menu.url}`, e)}>{menu.name}</ListItemText>
                    </MenuItem>
                )
            )
        ) : (<></>)
    }    
        </>
    )
}

export default CategoryMenuRow;