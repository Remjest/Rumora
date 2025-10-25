import styles from './A.module.css';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function A({ ...props }: AProps) {

    return (
        <div className={styles.a} {...props}>
            
        </div>
    );
}