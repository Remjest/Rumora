import NavButton from '@/components/shared/NavButton/NavButton';
import styles from './Menu.module.css';
import classNames from 'classnames';
import { useState } from 'react';

export interface MenuProps {
    className?: string,
    isMenuActive: boolean,
    setState: (value: boolean) => void,
}

const categories: Array<string> = [ 'science', 'general', 'entertainment', 'technology', 'business', 'health', 'sports' ];

export default function Menu({ className, isMenuActive, setState, ...props }: MenuProps) {

    const [activePoint, setActive] = useState<string | null>(null);

    const onClose = () => setState(false);

    const handleCategoryClick = (category: string): void => {
        setActive(category);
        onClose();
    };
    
    return (
        <div
            className={classNames(styles.menu, className, {
                [styles.menuActive]: isMenuActive,
            })}
            aria-label="News categories"
            {...props}>
            <NavButton className={styles.button}
                purpose='exit'
                aria-label="Close menu"
                onClick={onClose} />
            <nav className={styles.nav}>
                {categories.map(category => <button aria-label={`${category} category`} onClick={() => handleCategoryClick(category)}
                    key={category}
                    className={classNames(styles.point, {
                    [styles.activePoint] : category === activePoint,
                    })}>
                    {category}
                </button>)}
            </nav>
        </div>
    );
}