import { Box, FormControl, Grid, Skeleton }         from "@mui/material";
import Button                                       from "@mui/material/Button";
import TextField                                    from "@mui/material/TextField";
import { encode as base64_encode }                  from 'base-64';
import React, { createRef, useEffect, useState }    from "react";
import ReCAPTCHA                                    from "react-google-recaptcha";
import { useNavigate }                              from "react-router-dom";
import { useAppDispatch, useAppSelect }             from "../../../store/index.hooks";
import { getContentInfo }                           from "../../../store/modules/content";
import { User, asyncLogin }                         from "../../../store/modules/user";
import * as config                                  from '../../../config';

type LoginProps = {
    refer : string
}
function Login({refer} : LoginProps) {

    const dispatch      = useAppDispatch();
    const navigate      = useNavigate();
    const contentInfo   = useAppSelect(getContentInfo);

    const siteKeyVal = config.GOOGLE_RECAPTCHA_SITE_KEY;
    // process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY;
    console.log('Login >> process.env.NODE_ENV : ', process.env.NODE_ENV);
    const recaptchaRef : any    = createRef<ReCAPTCHA>();

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
        , reCaptchaToken        : ''
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
        setLoading(true);

        user.userId     = base64_encode(user.userId);
        user.password   = base64_encode(user.password);    

        const res = dispatch(asyncLogin(user));      
        console.log('login res : ', res, ' , json.parse : ', JSON.stringify(res));
        console.log('login refer : ', refer);
        setMsg("Login Success");
        navigate(`${refer}`);
    }

    const setReCaptchaToken = async (reCaptchaToken : any) => {
        if (reCaptchaToken !== null && reCaptchaToken !== undefined && reCaptchaToken !== '') {
            setUser({...user, reCaptchaToken : reCaptchaToken});
        } else {
            return;
        }
    }

    useEffect(()=>{
        if (msg) {
            setTimeout(() => {
                setMsg("");
                setLoading(false);
            }, 1500);
        }
    }, [msg]);

    const inputArea = () => {
        switch (loading) {
            case true : return (
                <Box sx={{height:350}}>
                    <Skeleton height="80px"/>
                    <Skeleton height="80px"/>
                    <Skeleton height="100px"/>
                    <Skeleton height="70px" />
                </Box>    
            )
            default : return (
                <Grid container>
                    <Grid container item>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField id="userId" label="Email" variant="filled" color="success" onChange={inputUsernameVal} value={user.userId} type="text" helperText="Please enter your Email" autoComplete="off"/> 
                        </FormControl>    
                    </Grid>
                    <Grid container item>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField id="password" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password" helperText="Please enter your password" autoComplete="off"/>
                        </FormControl>    
                    </Grid>
                    <Grid container item>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <ReCAPTCHA  ref={recaptchaRef} 
                                        size="normal" 
                                        badge="inline"
                                        sitekey={siteKeyVal} 
                                        theme={contentInfo.layoutType === 2 ? 'dark' : 'light'}
                                        onChange={setReCaptchaToken}
                                        />
                        </FormControl>    
                    </Grid>
                    <Grid container item>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Button type="submit" variant="outlined" size="large" disabled={loading}>Login</Button>
                        </FormControl>
                    </Grid>
                </Grid>    
            )
        }
    }

    return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
        <div className="Login">
            <form onSubmit={LoginAction}>
                {inputArea()}
            </form>
        </div>
      </Box>
    );
  }
  export default Login;
  