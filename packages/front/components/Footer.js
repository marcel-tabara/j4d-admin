// import BottomNavigation from '@material-ui/core/BottomNavigation'
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { makeStyles } from '@material-ui/core/styles';
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import RestoreIcon from '@material-ui/icons/Restore'
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // return (
  //   <BottomNavigation
  //     value={value}
  //     onChange={(event, newValue) => {
  //       setValue(newValue)
  //     }}
  //     showLabels
  //     className={classes.stickToBottom}
  //   >
  //     <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
  //     <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
  //     <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
  //   </BottomNavigation>
  // )
  return <div>Footer</div>;
};

export default Footer;
