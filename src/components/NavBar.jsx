import React from "react";
import {
  AppBar,
  makeStyles,
  Button,
  ButtonGroup,
  Toolbar
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  menu: {
    "&>*": {
      color: theme.palette.common.white,
      borderRadius: 0
    },
    "&>:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black
    }
  },
  logo: {
    padding: "0 60px 0 20px",
    "&>*": {
      fontSize: "1.5em",
      color: theme.palette.common.white
    }
  },
  active: {
    "&, &:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black
    }
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname: path } = useLocation();

  const handleClick = path => {
    history.push(path);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.logo}>
          <Button onClick={() => handleClick("/")}>My Store</Button>
        </div>
        <ButtonGroup
          orientation="horizontal"
          variant="text"
          aria-label="menu"
          className={classes.menu}
        >
          <Button
            className={path === "/movies" && classes.active}
            onClick={() => handleClick("/movies")}
          >
            Movies
          </Button>

          <Button
            className={path === "/customers" && classes.active}
            onClick={() => handleClick("/customers")}
          >
            Customers
          </Button>
          <Button
            className={path === "/rentals" && classes.active}
            onClick={() => handleClick("/rentals")}
          >
            Rentals
          </Button>
          <Button
            className={path === "/register" && classes.active}
            onClick={() => handleClick("/register")}
          >
            Register
          </Button>
        </ButtonGroup>
        <div style={{ flexGrow: 1 }}>
          <Button
            className={path === "/login" ? classes.active : null}
            onClick={() => handleClick("/login")}
            color="inherit"
            style={{ float: "right" }}
          >
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
