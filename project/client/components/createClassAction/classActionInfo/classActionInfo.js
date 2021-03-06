import React from 'react';
import classes from './classActionInfo.module.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Input, TextField } from "@material-ui/core";
import { categoriesRequest,classActionsRequest } from "../../../utils/requests";
import { useQuery } from "@apollo/react-hooks";
import { classActionReasons, classActionTypes } from '../../../utils/globalConsts';

const ClassActionInfo = props => {
    const { loading, data } = useQuery(categoriesRequest.getAll);
    const { data: dataT, error: errorT, loading: landingT } = useQuery(classActionsRequest.getAllClassActionTypes);
    const { data: dataR, error: errorR, loading: landingR } = useQuery(classActionsRequest.getAllClassActionReasons);
    if (loading || landingT || landingR) return <p>Loading...</p>;
    return (
        <div>
            כל השדות בדף הן חובה. עילת התביעה הראשונה שתבחר, תוצג כראשית 
            <Input
                placeholder="שם התביעה"
                className={classes.InputSearch}
                id="name"
                defaultValue={props.classAction.name}
                autoFocus={true}
                fullWidth={true}
                onChange={props.handleChangeInput}
                error={props.showMandatory && !props.classAction.name}
            />
            <Input
                placeholder="תיאור"
                className={classes.InputSearch}
                id="description"
                defaultValue={props.classAction.description}
                fullWidth={true}
                onChange={props.handleChangeInput}
                error={props.showMandatory && !props.classAction.description}
            />
            <Autocomplete
                options={dataT.typeClassActionQueries.typesOfClassActions}
                className={classes.InputSearch}
                getOptionSelected={(option, value) => {
                    return option.id === value.id
                }}
                getOptionLabel={(type) => type.name}
                id="type"
                defaultValue={props.classAction.type}
                autoComplete
                onChange={(event, values) => props.handleChangeAutoField(event, values,"type")}
                includeInputInList
                renderInput={(params) => <TextField {...params} error={props.showMandatory && !props.classAction.type} placeholder="סוג תביעה" fullWidth={true} />}
            />
            <Autocomplete multiple
                options={dataR.classActionReasonQueries.classActionReasons}
                className={classes.InputSearch}
                getOptionSelected={(option, value) => {
                    return option.id === value.id
                }}
                getOptionLabel={(reason) => reason.name}
                id="reasons"
                defaultValue={props.classAction.reasons}
                autoComplete
                onChange={(event, values) => props.handleReasons(event, values)}
                includeInputInList
                renderInput={(params) => <TextField {...params} error={props.showMandatory && !props.classAction.reasons} placeholder="עילת התביעה" fullWidth={true} />}
            />
            <Autocomplete
                options={data.CategoryQueries.categories}
                className={classes.InputSearch}
                defaultValue={props.classAction.category}
                getOptionSelected={(option, value) => {
                    return option.id === value.id
                }}
                getOptionLabel={(cat) => cat.name}
                id="category"
                autoComplete
                onChange={(event, values) => props.handleChangeAutoField(event, values, "category")}
                includeInputInList
                renderInput={(params) => <TextField error={props.showMandatory && !props.classAction.category} {...params} placeholder="קטגוריה" margin="normal" />}
            />
        </div>
    );
};

export default ClassActionInfo;