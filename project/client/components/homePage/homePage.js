import React from "react";
import classes from "./homePage.module.css";
import ClassActionsByFilter from "../classActionsByFilter/classActionsByFilter";
import CategoriesCards from "../categoriesCards/categoriesCards";
import ViewerHomePage from "./viewerHomePage/viewerHomePage"
import { useSelector } from "react-redux";
import PlaintiffHomePage from "./plaintiffHomePage/plaintiffHomePage";
import { classActionsFilters } from "../../utils/globalConsts"
import {ErrorBoundary} from 'react-error-boundary'
import ErrorPage from '../errorPage/errorPage';


export default function HomePage() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorPage}>

      {(Object.keys(loggedInUser).length === 0) &&
        <ViewerHomePage />}
      {
        (Object.keys(loggedInUser).length !== 0) &&
        <PlaintiffHomePage user={loggedInUser} />
      }
      <article className={classes.article}>
        <p className={classes.classActionTitle}>התובענות הבולטות ביותר</p>
        <ClassActionsByFilter filter={classActionsFilters.MOST_PROMINENT} limit={5}/>
        <p className={classes.classActionTitle}>קטגוריות התובענות</p>
        <CategoriesCards homePage={true}/>
      </article>
      </ErrorBoundary>
    </div>
  );
}
