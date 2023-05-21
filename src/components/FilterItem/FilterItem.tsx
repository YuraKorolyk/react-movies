import React, {FC} from 'react';
import classes from './FilterItem.module.scss'
import {FieldValues, UseFormRegister} from "react-hook-form";
interface IProps {
    children: string;
    name: string;
    id: number;
    register: UseFormRegister<FieldValues>;
    // onValidate: any;
}
const FilterItem:FC<IProps> = ({children, name, id,register}) => {
    const onValidate = (value: boolean | string, formValues:Record<string, string | boolean>) => {
        let bool: boolean | string = false;
        for (let formValuesKey in formValues) {
            if (formValues[formValuesKey]){
                bool = true
            }
        }
        return bool;
    }
    return (
        <div className={classes.btn}>
            <label>
                <input type="checkbox" value={id} {...register(name, {validate: onValidate})}/>
                <span>{children}</span>
            </label>
        </div>
        // <button className={classes.btn}>{children}</button>
    );
};

export default FilterItem;