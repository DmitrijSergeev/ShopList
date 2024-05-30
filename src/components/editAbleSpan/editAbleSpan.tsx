import React from 'react';

type Props = {
    value: string
}

export const EditAbleSpan = ({value}: Props) => {
    return (
        <span>{value}</span>
    );
};