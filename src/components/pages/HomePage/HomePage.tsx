import styles from './HomePage.module.css';
import ImgTag from '@/components/shared/ImgTag/ImgTag';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import Logo from './logo.svg';
import { useLocation, Outlet, Link } from 'react-router';

export interface HomePageProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}


export default function HomePage({ ...props }: HomePageProps) {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token);
    }, []);
    
    
    return (
        <main className={styles.homePage} {...props}>

            <h1 className={styles.h1}>{isLoggedIn ? 'Страница залогиненного пользователя' : 'Страница незалогиненного пользователя' }</h1>

        </main>
    );
}
