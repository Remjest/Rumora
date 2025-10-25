import ImgTag from '@/components/shared/ImgTag/ImgTag';
import styles from './FormWrapper.module.css';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import Logo from './logo.png';

export interface FormWrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    formType: 'login' | 'reg',
    children: ReactNode,
}

export default function FormWrapper({ formType, children, ...props }: FormWrapperProps) {

    const tip = formType === 'login' ?
        { span: "Нет аккаунта?", a: "Зарегистрируйтесь" } :
        { span: "Есть аккаунт?", a: "Войти" };

    return (
        <div className={styles.login} {...props}>
            <ImgTag src={Logo} />
            <h1 className={styles.h1}>Rumora</h1>
            
            { children }

            <div className={styles.tip}>
                <span>
                    {tip.span}
                </span>
                <a href="">
                    {tip.a}
                </a>
            </div>
        </div>
    );
}