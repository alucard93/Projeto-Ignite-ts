import React from 'react'
import styles from './Avatar.module.css'

export const Avatar = ({ src, hasBorder=true }) => {
// ou const hasBorder = hasBorder != false
  return (
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} />
  );
}
