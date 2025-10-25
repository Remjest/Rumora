import styles from './RegPage.module.css';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import RegForm from '@/components/blocks/RegForm/RegForm';

export interface RegPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

export default function RegPage({ ...props }: RegPageProps) {

    return (
        <main className={styles.regPage} {...props}>
            <RegForm />
        </main>
    );
}