import React, { useState, useEffect }   from "react";
import { useNavigate }                  from "react-router-dom";
import { encode as base64_encode }      from 'base-64';
import { Box, FormControl, Grid }       from "@mui/material";
import TextField                        from "@mui/material/TextField";
import Button                           from "@mui/material/Button"
import { useAppDispatch, useAppSelect } from "../../../store/index.hooks";
import { getLayoutInfo }                from "../../../store/modules/layout";
import { getContentInfo }               from "../../../store/modules/content";
import { User, asyncLogin }             from "../../../store/modules/user";

function Login() {

    const dispatch      = useAppDispatch();
    const navigate      = useNavigate();
    const layoutInfo    = useAppSelect(getLayoutInfo);
    const contentInfo   = useAppSelect(getContentInfo);

    const [loading, setLoading] = useState(false);
    const [msg, setMsg]         = useState("");
    const [user, setUser]       = useState<User>({
          userNo                : 0  
        , userId                : ""
        , password              : ""
        , introduce             : ""
        , accessToken           : ""
        , refreshToken          : ''
        , isLogin               : false
        , nickname              : ""
        , email                 : ""
        , returnCode            : 0
        , adminMenuCategoryList : []
        , userRoleInfoList      : []
        , roleInfoList          : []
        , birthday              : ''
        , sex                   : ''
        , phoneNo               : ''
        , additionalPhoneNo     : ''
        , address               : ''
        , detailAddress         : ''
        , zipcode               : 0
        , userProfile             : {
            sex         : '',
            phoneNo     : '',
            birthday    : '',
        },
    });

    const inputUsernameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, userId : e.target.value});
    }

    const inputPwVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, password : e.target.value});
    }

    const LoginAction = (e : React.FormEvent) => {
        e.preventDefault();
        if (!user.userId) {
            return alert('ID를 입력하세요.');
        } else if (!user.password) {
            return alert('Password를 입력하세요.');
        }

        user.userId     = base64_encode(user.userId);
        user.password   = base64_encode(user.password);    

        dispatch(asyncLogin(user));        
        setMsg("Login Success");
        navigate(`/${contentInfo.contentCode}`);
        setLoading(true);
    }

    useEffect(()=>{
        if (msg) {
            setTimeout(() => {
                setMsg("");
                setLoading(false);
            }, 1500);
        }
    }, [msg]);

    return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
      <div className="Login">
        <form onSubmit={LoginAction}>
        <Grid container>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Email" variant="filled" color="success" onChange={inputUsernameVal} value={user.userId} type="text" helperText="Please enter your Email" autoComplete="off"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password" helperText="Please enter your password" autoComplete="off"/>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button type="submit" variant="outlined" size="large" disabled={loading}>Login</Button>
                </FormControl>
            </Grid>
        </Grid>    
        </form>
      </div>
      </Box>
    );
  }
  export default Login;
  