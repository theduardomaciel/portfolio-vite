import { useEffect } from 'react';
import styles from './back-to-top.module.css';

export default function BackToTop() {

    function showBackToTopButtonOnScroll() {
        const backToTopButton = document.querySelector(`.backToTopButton`) as HTMLElement;
        if (window.scrollY > 500) {
            backToTopButton.classList.add("show")
        } else {
            backToTopButton.classList.remove("show")
        }
    }

    useEffect(() => {
        const backToTopButton = document.querySelector(`.backToTopButton`) as HTMLElement;
        if (backToTopButton) {
            window.addEventListener('scroll', showBackToTopButtonOnScroll);
            return () => window.removeEventListener('scroll', showBackToTopButtonOnScroll);
        }
    }, []);

    return (
        <a className={styles.backToTopButton} href="/#">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="24.5" fill="var(--primary-color-01)" stroke="white" />
                <path d="M25 33.75V16.25" stroke="var(--secondary-color-01)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.25 25L25 16.25L33.75 25" stroke="var(--secondary-color-01)" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </a>
    );
}