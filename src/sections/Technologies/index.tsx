import React, { useEffect, useRef, useState } from 'react';

import './technologies.css';

// Decoration
import Astronaut from "../../assets/astronaut_1024.mp4";

// Components
import Tag from '../../components/Tag';

// Data
import technologies from '../../utils/data/technologies.json';

// Icons
import { ReactComponent as HTMLIcon } from '../../assets/icons/techs/html.svg';
import { ReactComponent as CSSIcon } from '../../assets/icons/techs/css.svg';
import { ReactComponent as JavascriptIcon } from '../../assets/icons/techs/javascript.svg';
import { ReactComponent as TypescriptIcon } from '../../assets/icons/techs/typescript.svg';

import { ReactComponent as NextJSIcon } from '../../assets/icons/techs/nextjs.svg';
import { ReactComponent as NodeJSIcon } from '../../assets/icons/techs/nodejs.svg';

import { ReactComponent as ReactIcon } from '../../assets/icons/techs/react.svg';

import { ReactComponent as PrismaIcon } from '../../assets/icons/techs/prisma.svg';
import { ReactComponent as PostgreSQLIcon } from '../../assets/icons/techs/postgresql.svg';

import { ReactComponent as LuaIcon } from '../../assets/icons/techs/lua.svg';
import { ReactComponent as CSharpIcon } from '../../assets/icons/techs/csharp.svg';

// Hooks and Context
import { useScreenSize } from '../../hooks/useScreenSize';
import { useAppContext } from '../../context/appContext';
import Translate, { TranslateText } from '../../components/Translate';

const techIcons = [<HTMLIcon />, <CSSIcon />, <JavascriptIcon />, <TypescriptIcon />, <NextJSIcon />, <NodeJSIcon />, <ReactIcon />, <PrismaIcon />, <PostgreSQLIcon />, <LuaIcon />, <CSharpIcon />]

export default function Technologies({ ...props }) {
    const { isScreenWide } = useScreenSize();
    const { theme } = useAppContext();

    const [contentHeight, setContentHeight] = useState(0)
    const contentRef = useRef<HTMLDivElement | any>(null)

    function changeAstronautDivHeight() {
        const height = contentRef.current.clientHeight;
        setContentHeight(height)
    }

    useEffect(() => {
        changeAstronautDivHeight()
        new ResizeObserver(changeAstronautDivHeight).observe(contentRef.current)
    }, [])

    return (
        <section className='section wrapper' id='tech'>
            <header>
                <p><Translate>and finally,</Translate></p>
                <h2>tech</h2>
                <p><Translate>In my personal journey, I already worked with some technologies, and here they are:</Translate></p>
            </header>
            <div className="content">
                <ul ref={contentRef} className='techsList'>
                    {
                        technologies.map((techSection, sectionIndex) => <li key={sectionIndex} className='techSection'>
                            <Tag title={TranslateText(techSection.name)} />
                            <ul className='techs'>
                                {
                                    techSection.techs.map((tech, index) =>
                                        <li key={index} className='tech'>
                                            <div className='techIcon'>
                                                {techIcons[tech.id]}
                                            </div>
                                            <div className='techDescription'>
                                                <p>{tech.name} </p>
                                                <p>+{tech.experience} <Translate>{`${tech.unit}${tech.experience > 1 ? "s" : ""}`}</Translate> <Translate>experience</Translate></p>
                                            </div>
                                        </li>)
                                }
                            </ul>
                        </li>)
                    }
                </ul>
                <div style={{ display: isScreenWide ? "flex" : "none", height: contentHeight }} className='astronautDeco'>
                    <video style={{ filter: theme === "light" ? "invert()" : "none" }} autoPlay width="320" src={Astronaut} height="240" muted loop disablePictureInPicture controlsList="nodownload">
                        <Translate>Your browser does not support the video tag.</Translate>
                    </video>
                </div>
            </div>
        </section>
    );
}