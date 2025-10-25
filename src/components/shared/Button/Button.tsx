import classNames from 'classnames';
import styles from './Button.module.css';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode,
    background: 'grad' | 'primary'
}

export default function Button({ children, background, ...props }: ButtonProps) {

    return (
        <button className={classNames(styles.button, {
            [styles.grad]: background === 'grad',
            [styles.primary]: background === 'primary',
        })} {...props}>
            {children}
        </button>
    );
}