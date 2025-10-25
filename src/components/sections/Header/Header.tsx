import classNames from 'classnames';
import styles from './Header.module.css';
import NavButton from '@/components/shared/NavButton/NavButton';
import ImgTag from '@/components/shared/ImgTag/ImgTag';
import Logo from './logo.png';
import Menu from '@/components/blocks/Menu/Menu';
import { DetailedHTMLProps, HTMLAttributes,  useState } from 'react';

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    className?: string,
}

export default function Header({ className, ...props }: HeaderProps) {

    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    
    const handleMenuClick = () => setIsMenuActive(true);
    
    return (
        <header className={classNames(styles.header, className)} {...props}>
            {isMenuActive && <div className={styles.overlay} onClick={() => setIsMenuActive(false)} />}
            <Menu isMenuActive={isMenuActive} setState={setIsMenuActive}/>
            <NavButton purpose='menu' aria-label="Open menu" onClick={handleMenuClick} />
            <ImgTag src={Logo} alt="BESIDER Logo" className={styles.logo} />
        </header>
    );
}