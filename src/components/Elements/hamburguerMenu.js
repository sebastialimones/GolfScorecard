import React, { useState } from 'react';
import { auth } from '../../services/admin';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { purple } from '@material-ui/core/colors';

export const HamburguerMenu = ({ routeCreateCourse, routeDashboardHomeClick, routeResultsClick, routeCoursesClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = (event) => {
    event.preventDefault();
    routeDashboardHomeClick();
    handleClose();
  };

  const handleResultsClick = (event) => {
    event.preventDefault();
    routeResultsClick();
    handleClose();
  };

  const handleCreateCourse = (event) => {
    event.preventDefault();
    routeCreateCourse();
    handleClose();
  };

  const handleCourseClick = (event) => {
    event.preventDefault();
    routeCoursesClick();
    handleClose();
  };

  const handleLogOut = () => {
    auth.signOut();
    handleClose();
  };

  return (
    <div>
      <IconButton
      aria-label="more"
      aria-controls="fade-menu"
      aria-haspopup="true"
      onClick={ handleClick }
      style={{ color: purple[50] }}
      >
        <MoreVertIcon fontSize='large'/>
      </IconButton>
    <Menu
      id="fade-menu"
      anchorEl={ anchorEl }
      keepMounted
      open={ open }
      onClose={ handleClose }
      TransitionComponent={ Fade }
    >
      <MenuItem onClick={ handleResultsClick }>Tarjeta</MenuItem>
      <MenuItem onClick={ handleDashboardClick }>Estadístiques</MenuItem>
      <MenuItem onClick={ handleCreateCourse }>Crear camp</MenuItem>
      <MenuItem onClick={ handleCourseClick }>Camps</MenuItem>
      <MenuItem onClick={ handleLogOut }>Logout</MenuItem>
    </Menu>
  </div>
  );
}