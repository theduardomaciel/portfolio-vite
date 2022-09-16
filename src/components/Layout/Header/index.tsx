import { useEffect, useRef, useState } from 'react';

import './header.css';

// Icons
import { ReactComponent as LanguageIcon } from '../../../assets/icons/language.svg';

import { ReactComponent as DetailIcon } from '../../../assets/icons/level_of_detail.svg';

import { ReactComponent as DarkModeIcon } from '../../../assets/icons/dark_mode.svg';
import { ReactComponent as LightModeIcon } from '../../../assets/icons/light_mode.svg';

import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

// Context
import { useAppContext } from '../../../context/appContext';
import Translate from '../../Translate';
import { useScreenSize } from '../../../hooks/useScreenSize';

export default function Header() {

    const { width } = useScreenSize();
    const { switchTheme, theme, changeLanguage, language, changeLOD, LOD } = useAppContext();

    const navLine = useRef<HTMLElement>(null) as any;
    const [originalSizes, setOriginalSizes] = useState({} as any);

    function updateNavLine(button: HTMLElement, sectionId: string) {
        /* navLine.current.style.left = `${button.offsetLeft}px`; */
        const decreasedSize = button.offsetWidth //button.offsetWidth - ((25 / 100) * button.offsetWidth);
        navLine.current.style.width = `${decreasedSize}px`;
        if (button && navLine.current) {
            navLine.current.style.left = `${button.offsetLeft + (button.offsetWidth / 2) - (originalSizes[sectionId] / 2)}px`;
        }
    }

    const [isMenuVisible, setMenuVisible] = useState(false)
    const [isScreenScrolled, setScreenScrolled] = useState(false)

    function showNavOnScroll() {
        if (window.scrollY === 0) {
            setScreenScrolled(false)
        } else {
            setScreenScrolled(true)
        }
    }

    const lastSectionId = useRef<string>("home");
    const lastMenuSection = useRef<any>(null);

    function changeMenuSection() {
        const documentSections = [document.querySelector("#home"), document.querySelector("#projects"), document.querySelector("#tech")]
        const middleLine = window.scrollY + (window.innerHeight / 2)

        function getCurrentSection(section: HTMLElement) {
            // Verificando em qual seção o usuário está
            // Utilizaremos o "id" da seção e obteremos o "offsetTop"
            const sectionTop = section.offsetTop
            const sectionHeight = section.offsetHeight

            const sectionIsAboveOrInsideMiddleLine = middleLine >= sectionTop

            const nextSectionBegin = sectionHeight + sectionTop // Somamos o tamanho fixo da seção com o valor da altura da seção para sabermos a localização de início da seção seguinte
            const nextSectionIsUnderMiddleLine = middleLine < nextSectionBegin

            const isInBoundaries = sectionIsAboveOrInsideMiddleLine && nextSectionIsUnderMiddleLine

            if (isInBoundaries) {
                return true
            }
        }

        documentSections.forEach(section => {
            const lastSection = document.querySelector(`#${lastSectionId.current}`)
            if (section && section !== lastSection) {
                const sectionIsInBoundaries = getCurrentSection(section as HTMLElement)
                if (sectionIsInBoundaries) {
                    const sectionId = section.getAttribute("id") as string;

                    const menuElement = document.querySelector(`.menu a[title*=${sectionId}]`) as HTMLElement;
                    menuElement.classList.add("active")

                    const lastMenuElement = document.querySelector(`.menu a[title*=${lastSectionId.current}]`)
                    if (lastMenuElement) {
                        lastMenuElement.classList.remove("active")
                    }

                    lastMenuSection.current = menuElement;
                    lastSectionId.current = sectionId;

                    updateNavLine(menuElement, sectionId)
                }
            }
        });
    }

    const handleScroll = () => {
        showNavOnScroll()
        changeMenuSection()
    }

    useEffect(() => {
        if (lastMenuSection.current) {
            updateNavLine(lastMenuSection.current, lastSectionId.current)
        }
    }, [width]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        function firstUpdate() {
            const homeButton = document.querySelector(`.menu a[title*=home]`) as HTMLElement;
            const projectsButton = document.querySelector(`.menu a[title*=projects]`) as HTMLElement;
            const techButton = document.querySelector(`.menu a[title*=tech]`) as HTMLElement;

            setOriginalSizes({
                home: homeButton.offsetWidth,
                projects: projectsButton.offsetWidth,
                tech: techButton.offsetWidth
            })

            updateNavLine(homeButton, "home")
        }
        if (document.readyState === "complete") {
            firstUpdate();
        } else {
            document.onreadystatechange = function () {
                if (document.readyState === "complete") {
                    firstUpdate();
                }
            }
        }
    }, [navLine.current])

    return (
        <nav className={`nav ${isMenuVisible && "menuExpanded"} ${LOD === "high" && "highDetail"} ${isScreenScrolled && "scroll"}`}>
            <div className={`wrapper`}>
                <a href="/#">
                    <p className='title'>{` <>edu.</> `}</p>
                </a>

                <div className={"menu"}>
                    <div className={"content"}>
                        <ul className={"list"} onClick={() => setMenuVisible(false)}>
                            <div ref={navLine} className={'navLine'}></div>
                            <li className='list'><a className={"home active"} href='/#' title="home">
                                <Translate>Home</Translate>
                            </a></li>
                            <li className='list'><a className={"projects"} title="projects" href="/#projects">
                                <Translate>Projects</Translate>
                            </a></li>
                            <li className='list'><a className={"tech"} title="tech" href="/#tech">Tech</a></li>
                            <a href="/#contact" className='button'>
                                <Translate>Contact</Translate>
                            </a>
                        </ul>
                        <div style={{ display: "flex", gap: "7.5rem" }}>
                            <div className='iconHolder theme' onClick={switchTheme}>
                                {
                                    theme === "dark" ?
                                        <DarkModeIcon className='interactiveIcon' />
                                        :
                                        <LightModeIcon width={28} height={28} className='interactiveIcon' />
                                }
                                <p>{theme}</p>
                            </div>
                            <div className='iconHolder' onClick={changeLanguage}>
                                <LanguageIcon fill='var(--primary-color-01)' className='interactiveIcon' />
                                <p>{language}</p>
                            </div>
                            <div className='iconHolder lod' onClick={changeLOD}>
                                <DetailIcon fill='var(--primary-color-01)' className='interactiveIcon detail' />
                                <p>{LOD}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button type='button' className={'open-menu'} onClick={() => setMenuVisible(!isMenuVisible)}>
                    {
                        isMenuVisible ?
                            <CloseIcon className='menuIcon filled' />
                            :
                            <MenuIcon className='menuIcon outlined' />
                    }
                </button>
            </div>
            <div className='blurBackground'></div>

        </nav>
    );
}