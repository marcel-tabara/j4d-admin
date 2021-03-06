import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import React from 'react'
import styles from '../../assets/jss/material-dashboard-react/components/buttonStyle.js'

const useStyles = makeStyles(styles)

const RegularButton = (props) => {
  const classes = useStyles()
  const {
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  })
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  )
}

export default RegularButton
