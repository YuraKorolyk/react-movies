import React from 'react';
import classes from './ThemeSwitcher.module.scss'
const ThemeSwitcher = () => {
    return (
        <div className={classes.mainWrapper}>
            <div className={classes.text} id="light-theme-text">Light</div>
            <div className={classes.themeSwitchWrapper}>
                <label htmlFor="theme-btn">
                    <input type="checkbox" id="theme-btn"/>
                    <div className={classes.sliderWrapper}>
                        <div className={classes.themeBtnSlider}></div>
                        <span className={classes.star + " " + classes.star1}></span>
                        <span className={classes.star + " " + classes.star2}></span>
                        <span className={classes.star + " " + classes.star3}></span>
                        <span className={classes.star + " " + classes.star4}></span>
                        <span className={classes.star + " " + classes.star5}></span>
                        <span className={classes.star + " " + classes.star6}></span>
                    </div>
                </label>
            </div>
            <div className="text disabled" id="dark-theme-text">Dark</div>
        </div>
    );
};

export default ThemeSwitcher;