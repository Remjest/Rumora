import ImgTag from '@/components/shared/ImgTag/ImgTag';
import styles from './Footer.module.css';
import ApiIcon from './api.png';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>{}

const navPoints = ['Log In', 'About Us', 'Publishers', 'Sitemap'];

export default function Footer({ ...props}: FooterProps) {
    
    return (
        <footer className={styles.footer} {...props}>
            <nav className={styles.nav}>
                {navPoints.map(point => <a key={point} href='https://google.ru' target='_blank' rel="noreferrer" aria-label={`${point} link`}><span>{point}</span></a>)}
            </nav>
            <div className={styles.powered}>
                <span>Powered by</span>
                <ImgTag src={ApiIcon} alt='News API' />
            </div>
            <div className={styles.copyright}>
                {`© ${new Date().getFullYear()} Besider. Inspired by Insider`}
            </div>
        </footer>
    );
}