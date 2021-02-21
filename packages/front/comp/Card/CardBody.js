import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';
import styles from '../../assets/jss/material-dashboard-react/components/cardBodyStyle.js';

const useStyles = makeStyles(styles);

const CardBody = (props) => {
  const classes = useStyles();
  const { className, children, plain, profile, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [className]: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
