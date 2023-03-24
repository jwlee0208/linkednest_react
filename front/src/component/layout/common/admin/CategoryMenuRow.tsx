import { adminMenuCategory, adminMenus } from "../../../../store/modules/adminMenu";
import { Box } from "@mui/material";

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

    return (
       <> 
        <Box><h2>{menuCategoryName}</h2></Box>
        <hr/>
        <Box>
            {
                menusArr.map(menu => (
                    <Box><a href={menu.menuUrl}>{menu.menuName}</a></Box>        
                ))        
            }
        </Box>
        </>
    )
}

export default CategoryMenuRow;