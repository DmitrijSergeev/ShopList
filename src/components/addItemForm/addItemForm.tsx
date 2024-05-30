import React, {KeyboardEvent, useRef, useState} from 'react';
import s from "./addItemForm.module.css";

type AddItemFormProps = {
    addItem: (title: string)=> void
}

export const AddItemForm = (props: AddItemFormProps) => {
    const {addItem} = props

    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const addTaskHandler = () => {
        if (inputRef.current) {
            if (inputRef.current.value !== '') {
                addItem(inputRef.current.value.trim());
                inputRef.current.value = ''
            } else {
                setError('Title is required')
            }
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <input ref={inputRef}
                   onKeyDown={onKeyDownHandler}
                   className={error ? s.error : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};
