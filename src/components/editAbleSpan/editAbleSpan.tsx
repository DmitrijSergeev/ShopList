import React, {ChangeEvent, useState} from 'react';

type Props = {
    value: string
    onChange: (title: string)=>void
}

export const EditAbleSpan = ({value, onChange}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <input value={title}
                       onChange={changeTitleHandler}
                       onBlur={deactivateEditModeHandler}
                       autoFocus
                />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )
            }
        </>
    );
};
