import React, {FC, ReactNode} from 'react';
import './Container.scss'
interface IProps {
    children: ReactNode;
    className?: string;
}
const Container:FC<IProps> = ({children, className}) => {
    const containerClass = className ? `container ${className}` : 'container'
    return (
        <div className={containerClass} >
            {children}
        </div>
    );
};

export default Container;