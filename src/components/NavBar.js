import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import withWidth from '@material-ui/core/withWidth';

import UserContext from '../contexts/UserContext';
import useStyles from './NavBarStyles';

import styles from './NavBar.module.scss';

export default withWidth()(function NavBar({ width }) {
  const isSmallScreen = /xs|sm/.test(width);
  const className = {
    className: isSmallScreen ? styles['main-small'] : styles.main, 
  }
  const User = useContext(UserContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (isDashboard, link) => {
    setAnchorEl(null);
    if (isDashboard) {
      history.push(link);
    } 
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.clear();
    User.setToken(null)
    history.push('/');
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={() => handleMenuClose(false)}
    >
      <MenuItem onClick={() => {handleMenuClose(true, '/dashboard')}}>Dashboard</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(true, '/settings')}}>My account</MenuItem>
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => {handleMenuClose(true, '/dashboard')}}>Dashboard</MenuItem>
      <MenuItem onClick={() => {handleMenuClose(true, '/settings')}}>My account</MenuItem>
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="static" className={classes.app}>
        <Toolbar className={isSmallScreen ? styles['main-small'] : styles.main}>
          <Typography className={classes.title} variant="h6" onClick={() => {history.push('/')}}>
            SILENT AUCTION
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <Button className={classes.button} variant="outlined" onClick={() => {history.push('/auctions')}}>
                Auctions
          </Button>
          {!User.token && 
            <div className={isSmallScreen ? styles['main-small'] : styles.main}>
              <Button className={classes.button} variant="outlined" onClick={() => {history.push('/signup')}}>
                Sign Up
              </Button>
              <Button className={classes.button} variant="outlined" onClick={() => {history.push('/signin')}}>
                Sign In
              </Button>
            </div>
          }
          {User.token &&
            <>
              {User.is_seller && <Button className={classes.button} variant="outlined" onClick={() =>{history.push('/auctions/add')}}>
                Add Item
              </Button>}
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </>
          }
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>

      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
})
 