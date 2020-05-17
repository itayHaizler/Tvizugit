import React from 'react';
import classes from "./login.module.css"
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { changeLoggedInUser } from '../../store/user';
import { useDispatch , useSelector } from 'react-redux';

function ProfileDetails (props) {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user.loggedInUser)
    let password1;
    let password2;
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
                ( !password1 ||
                  !password2 ) ) ){
            alert("יש למלא את כל השדות")
        }
        else if (!reg.test(loggedInUser.email)){
            alert("כתובת מייל אינה תקינה")
        }
        else if( password1 !== undefined && password1.length < 8 ){
            alert("יש להזין סיסמא בת 8 תווים לפחות")
        }
        else if( password1 !== password2 ){
            alert("הסיסמאות אינן תואמות")
        }
        else{
            if(!password1 !== undefined){
            loggedInUser.password = password1;
            }
            dispatch(changeLoggedInUser(loggedInUser));
            //console.log(loggedInUser);
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
                <TextField label={props.role === 'lawyer'? 'שם המשרד': 'שם מלא'}
                           name="displayName"
                           defaultValue={loggedInUser.displayName}
                           required
                           onChange={handleChange}
                           className={classes.Input}
                           fullWidth={true}/><br/><br/>
                <TextField label={props.role === 'lawyer'? 'שם משתמש למשרד': 'שם משתמש'}
                            name="name"
                            required
                            defaultValue={loggedInUser.name}
                           onChange={handleChange}
                            className={classes.Input}
                            fullWidth={true}/><br/><br/>
                <TextField label={props.role === 'lawyer'? 'אימייל למשרד': 'אימייל'}
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