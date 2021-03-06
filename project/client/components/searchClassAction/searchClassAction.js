import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import CategoryCard from "../categoryCard/categoryCard";
import Chip from "@material-ui/core/Chip";
import { useQuery } from "@apollo/react-hooks";
import { categoriesIcons } from "../../utils/globalConsts";
import { categoriesRequest } from "../../utils/requests";
import classes from "./searchClassAction.module.css";
import Spinner from "../spinner/spinner";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeFilter } from "../../store/classAction";

const SearchActionClass = (props) => {
  const [value, setValue] = useState("");
  let [hashtags] = useState([]);
  let [chosenCategories] = useState([]);
  let [chosenName, setChosenName] = useState(" ");
  let categories = null;

  const dispatch = useDispatch();
  let history = useHistory();
  const { loading, data } = useQuery(categoriesRequest.getAll);
  useEffect(() => {}, [data]);
  if (loading) return <Spinner />;
  categories = data.CategoryQueries.categories;

  const handleCategoryClick = (id) => {
    if (chosenCategories.includes(id)) {
      chosenCategories = chosenCategories.filter((item) => item !== id);
    } else {
      chosenCategories.push(id);
    }
  };

  let allCategories = [];
  let threeCategories = [];
  for (let i = 0; i < categories.length; i += 3) {
    for (let j = i; j < i + 3; j++) {
      threeCategories.push(
        <CategoryCard
          click={handleCategoryClick}
          key={categories[j].id}
          id={categories[j].id}
          name={categories[j].name}
          icon={categoriesIcons[categories[j].name]}
          title={categories[j].name}
        />
      );
    }
    allCategories.push(<div key={i}>{threeCategories}</div>);
    threeCategories = [];
  }

  const keyDownHandler = (event) => {
    if (["Enter", "Tab", ","].includes(event.key)) {
      event.preventDefault();
      hashtags.push(value.trim());
      setValue("");
    }
  };

  const inputChangedHandler = (event) => {
    setValue(event.target.value);
  };

  const searchButtonHandler = (e) => {
    
    const filter = {
      name: chosenName,
      categories: chosenCategories,
      hashtags: hashtags,
    };
    dispatch(changeFilter(filter));
    clearLocalState();
    history.push("/classActionsStock/");
    props.close();
  };

  const clearLocalState = () => {
    setChosenName(" ");
    chosenCategories = [];
    hashtags = [];
  };

  const nameInputHandler = (event) => {
    setChosenName(event.target.value);
  };

  const cancelButtonHandler = () => {
    clearLocalState();
    props.close();
  };

  return (
    <div className={classes.SearchClassAction}>
      <div className={classes.Title}>
        <SearchIcon className={classes.SearchIcon} />
        <h1>חיפוש תובענה ייצוגית</h1>
      </div>
      <Input
        placeholder="חיפוש לפי שם התביעה"
        className={classes.InputSearch}
        autoFocus={true}
        fullWidth={true}
        onChange={nameInputHandler}
      />
      <Input
        placeholder=" חיפוש לפי תגיות (לחץ Enter עבור כל תגית)"
        className={classes.InputSearch}
        fullWidth={true}
        value={value}
        onChange={inputChangedHandler}
        onKeyDown={keyDownHandler}
      />

      {hashtags.map((hashtag, index) => {
        return <Chip className={classes.Chip} key={index} label={hashtag} />;
      })}

      <h3 className={classes.SearchByCategory}>חיפוש לפי קטגוריה</h3>

      <div className={classes.Categories}>{allCategories}</div>
      <Button variant="contained" onClick={cancelButtonHandler}>
        ביטול
      </Button>
      <Button className={classes.SearchButton} onClick={searchButtonHandler}>
        חיפוש
      </Button>
    </div>
  );
};

export default SearchActionClass;
