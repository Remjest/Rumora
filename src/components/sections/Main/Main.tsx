import styles from './Main.module.css';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MainProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export interface Date {
    year: number,
    month: number
}

export default function Main({ ...props }: MainProps) {

    return (
        <main className={styles.main} {...props}>
            
        </main>
    );
}