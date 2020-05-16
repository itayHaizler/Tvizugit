import React from 'react';
import classes from "./login.module.css"
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { changeLoggedInUser } from '../../store/user';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function ProfileDetails (props) {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user.loggedInUser)
    let password1;
    let password2;
    let fullName = 'שם מלא';
    let userName = 'שם משתמש';
    let email = 'אימייל';
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if(props.role === 'lawyer'){
        fullName = 'שם המשרד';
        userName = 'שם משתמש למשרד';
        email = 'אימייל המשרד';
    }

    const handleChange = (event) => {
        loggedInUser[event.target.name] = event.target.value;
    }

    const changePassword1 = (event) => {
        password1 = event.target.value;
    }

    const changePassword2 = (event) => {
        password2 = event.target.value;
    }

    const handleSave = () => {

        if( loggedInUser.user === "" || 
            loggedInUser.displayName === "" ||
            loggedInUser.email === "" ||
            ( loggedInUser.password === "" &&
                ( password1 === undefined ||
                  password2 === undefined ) ) ){
            alert("יש למלא את כל השדות")
        }
        else if ( reg.test(loggedInUser.email) === false ){
            alert("כתובת מייל אינה תקינה")
        }
        else if( password1 !== undefined && password1.length < 8 ){
            alert("יש להזין סיסמא בת 8 תווים לפחות")
        }
        else if( password1 !== password2 ){
            alert("הסיסמאות אינן תואמות")
        }
        else{
            if(password1 !== undefined){
            loggedInUser.password = password1;
            }
            dispatch(changeLoggedInUser(loggedInUser));
            console.log(loggedInUser);
            props.clickNext();
        }
    }

    return(
        <div>
            <div className={classes.Center}>
                <h2> {props.children} { props.title }</h2>
                <hr color="#e6e6e6"/>
            </div>
            <div className={classes.UserRegister}>
                <TextField label={fullName}
                           name="displayName"
                           defaultValue={loggedInUser.displayName}
                           required
                           onChange={handleChange}
                           className={classes.Input}
                           fullWidth={true}/><br/><br/>
                <TextField label={userName}
                            name="name"
                            required
                            defaultValue={loggedInUser.name}
                           onChange={handleChange}
                            className={classes.Input}
                            fullWidth={true}/><br/><br/>
                <TextField label={email}
                            name="email"
                            required
                            defaultValue={loggedInUser.email}
                            onChange={handleChange}
                            className={classes.Input}
                            type="email"
                            fullWidth={true}/><br/><br/>
                <TextField label="סיסמא"
                            name="password1"
                            required
                            defaultValue={loggedInUser.password}
                            onChange={changePassword1}
                            className={classes.Input}
                            fullWidth={true}
                            type="password"/><br/><br/>
                <TextField label="אימות סיסמא"
                            name="password2"
                            required
                            defaultValue={loggedInUser.password}
                            onChange={changePassword2}
                            className={classes.Input}
                            fullWidth={true}
                            type="password"/><br/><br/>
                <Button className={classes.ProfileButton} 
                        onClick={handleSave}>{props.textNext}</Button>
                <Button className={classes.BackButton} 
                        variant="contained" 
                        onClick={props.clickBack}>חזור</Button>
            </div>
        </div>
    )
}

export default ProfileDetails;