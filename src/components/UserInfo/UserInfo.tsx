import React, {FC} from 'react';
import classes from "./UserInfo.module.scss";

interface IProps {
    imgUrl: string;
    alt?: string
}
const UserInfo:FC<IProps> = ({imgUrl, alt='user photo'}) => {
    return (
        <div className={classes.userIcon}>
            <img src={imgUrl} alt={alt}/>
        </div>
    );
};

export default UserInfo;