import React, { useState, useEffect, useMemo }  from "react";
import { encode as base64_encode }              from 'base-64';
import { useNavigate }                          from "react-router-dom";
import { asyncSignUp, User, UserProfile }                    from "../../../store/modules/user";
import { getLayoutInfo }                        from "../../../store/modules/layout";
import { useAppDispatch, useAppSelect }         from "../../../store/index.hooks";
import { Box, FormControl, Grid }               from "@mui/material";
import Button                                   from "@mui/material/Button"
import TextField                                from "@mui/material/TextField";
import ReactQuill                               from 'react-quill';
// import ReactPhoneInput                          from 'react-phone-input-material-ui';
import 'react-quill/dist/react-quill';
import FormLabel                                from "@mui/material/FormLabel";
import RadioGroup                               from "@mui/material/RadioGroup";
import FormControlLabel                         from "@mui/material/FormControlLabel";
import Radio                                    from "@mui/material/Radio";
import Typography                               from "@mui/material/Typography/Typography";
import { AdapterDayjs }                         from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider }                 from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker }                           from '@mui/x-date-pickers/DatePicker';
import Parser                                   from 'html-react-parser';
import { format } from 'date-fns';

type SignUpProps = {
    stepId : number,
}

function SignUpByStep({
    stepId
} : SignUpProps) {


    const dispatch      = useAppDispatch();
    const navigate      = useNavigate();
    const layoutInfo    = useAppSelect(getLayoutInfo);
    const [user, setUser] = useState<User>({
          username              : ""
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
        , userProfile             : {
            birthday            : '',
            sex                 : 'female',
            phoneNo             : '',
            additionalPhoneNo   : '',
            address             : '',
            detailAddress       : '',
            zipcode             : 0,
        },
    });

    const [userProfile, setUserProfile] = useState<UserProfile>({
        birthday            : '',
        sex                 : 'female',
        phoneNo             : '',
        additionalPhoneNo   : '',
        address             : '',
        detailAddress       : '',
        zipcode             : 0,
    });

    const inputUsernameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, username : e.target.value});
    }

    const inputPwVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, password : e.target.value});
    }

    const inputNicknameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, nickname : e.target.value});
    }

    const inputEmailVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser({...user, email : e.target.value});
    }

    function inputIntroduceVal (value : any) {
        setUser({...user, introduce : value});
    }
    
    const inputPhoneNoVal = (value : any) => {
        // console.log('[signup] inputPhoneNoVal : ' + value);

        setUserProfile({...userProfile, phoneNo : value });
        setUser({...user, userProfile : userProfile});
        console.log('userprofile : ' + JSON.stringify(userProfile));
    }

    const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // console.log('[signup] handleSexChange : ' + e.target.value);

        setUserProfile({...userProfile, sex : e.target.value});
        setUser({...user, userProfile : userProfile});

        console.log('userprofile : ' + JSON.stringify(userProfile));
    }

    const handleDateChange = (value : any) => {
        
        console.log('handleDateChange : ' + format(new Date(value), 'yyyyMMdd'));

        setUserProfile({...userProfile, birthday : format(new Date(value), 'yyyyMMdd').toString()});
        setUser({...user, userProfile : userProfile});
    }
    const SignupAction = (e : React.FormEvent) => {
        e.preventDefault();
        if (!user.username) {
            return alert('ID를 입력하세요.');
        } else if (!user.password) {
            return alert('Password를 입력하세요.');
        } else if (!user.email) {
            return alert('Email을 입력하세요.');
        } else if (!user.nickname) {
            return alert('Nickname을 입력하세요.');
        }

        console.log('[signup] before encode : ' + JSON.stringify(user));

        user.username = base64_encode(user.username);
        user.password = base64_encode(user.password);        

        const res = dispatch(asyncSignUp(user));
        
    }

    useEffect(()=>{
        const quillCss = document.createElement("link");
        quillCss.crossOrigin    = '*';
        quillCss.rel            = 'stylesheet';
        quillCss.type           = "text/css";
        quillCss.href           = `https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css`;
        
        document.head.appendChild(quillCss);
        return () => {
          document.head.removeChild(quillCss);
        }
    }, []);

    const modules = useMemo(
        () => ({
            toolbar: { // 툴바에 넣을 기능
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    ['link', 'image'],
                ],
            },
        }), []);

    return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
      <div className="SignUp">
        <form onSubmit={SignupAction}>
        <Grid container>
{
    stepId === 0 ? 
    (
    <>    
        <Grid container item>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField id="outlined-basic" name="username"  label="User ID" variant="filled" color="success" onChange={inputUsernameVal} value={user.username} type="text" helperText="Please enter your ID"/> 
            </FormControl>    
        </Grid>
        <Grid container item>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField id="outlined-basic" name="password" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password" helperText="Please enter your password"/>
            </FormControl>    
        </Grid>
        <Grid container item>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField id="outlined-basic" name="email" label="Email" variant="filled" color="success" onChange={inputEmailVal} value={user.email} type="email" helperText="Please enter your Email"/> 
            </FormControl>    
        </Grid>
        <Grid container item>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField id="outlined-basic" name="nickname" label="Nickname" variant="filled" color="success" onChange={inputNicknameVal} value={user.nickname} type="text" helperText="Please enter your Nickname"/>
            </FormControl>    
        </Grid>
    </>
    ) 
    : (<></>)
}
{    
    stepId === 1 ? (
        <>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="nickname" label="Nickname" variant="filled" color="success" onChange={inputNicknameVal} value={user.nickname} type="text" helperText="Please enter your Nickname"/>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleSexChange}
                        value={userProfile.sex}
                    >
                        <FormControlLabel value="female"    control={<Radio />} label="Female"  checked={userProfile.sex === 'female' || userProfile.sex === ''}/>
                        <FormControlLabel value="male"      control={<Radio />} label="Male"    checked={userProfile.sex === 'male'}/>
                    </RadioGroup>

                </FormControl>        
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Introduce</FormLabel>
                    <ReactQuill onChange={inputIntroduceVal} modules={modules} theme="snow" style={{minHeight: '250px',  width: '100%', borderBlockColor:'black', marginBottom: '50px'}} value={user.introduce}/>    
                </FormControl>
            </Grid>        
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <React.Fragment>
                        {/* <ReactPhoneInput 
                            onChange={inputPhoneNoVal} component={TextField} value={userProfile.phoneNo}/> */}
                    </React.Fragment>
                </FormControl>
            </Grid> 
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={handleDateChange} />
                    </LocalizationProvider>    
                </FormControl>
            </Grid>       

        </>
    ) : (<></>)
}
{    
    stepId === 2 ? (
        <Box sx={{width : '100%', pl: 10, pr : 10}}>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">UserId</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.username}</Typography>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">E-Mail</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.email}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Nickname</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.nickname}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                
            <Grid container alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">phoneNo</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.userProfile.phoneNo}</Typography>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container  alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sex</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.userProfile.sex}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                                        
            <Grid container  alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Birth Day</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Typography>{user.userProfile.birthday}</Typography>
                    </FormControl>
                </Grid>
            </Grid>                                        
            <Grid container  alignItems="center">
                <Grid item xs={2}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Introduce</FormLabel>
                </Grid>
                <Grid item xs={10}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Box>
                            {Parser(decodeURI(user.introduce).replaceAll('\\"', '"'))}
                        </Box>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button type="submit" variant="outlined" size="large">Sign Up</Button>
                </FormControl>
            </Grid>
        </Box>
    ) : (<></>)
}
        </Grid>    
        </form>
      </div>
      </Box>
    );
  }
  export default SignUpByStep;
  