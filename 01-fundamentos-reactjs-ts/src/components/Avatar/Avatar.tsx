import React from 'react'
import styles from './Avatar.module.css'
import { AvatarProps } from '../../interfaces/interfaces'

export const Avatar = ({ hasBorder=true, ...props }: AvatarProps) => {
// ou const hasBorder = hasBorder != false
  return (
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
    {...props}
    />
  );
}
