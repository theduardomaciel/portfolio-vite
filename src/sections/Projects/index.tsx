import React, { useEffect, useRef, useState } from 'react';
import {
    CSSTransition,
} from 'react-transition-group';

import './projects.css';

// Components
import Button from '../../components/Button';

// Data
import projects from '../../utils/data/projects.json';

// Icons
import { ReactComponent as DownArrow } from '../../assets/icons/down_arrow.svg';
import { ReactComponent as ChevronLeft } from '../../assets/icons/chevron.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg';

// Enterprises
import { ReactComponent as GithubLogo } from '../../assets/icons/enterprises/github.svg';
import Translate, { TranslateText } from '../../components/Translate';
import { useScreenSize } from '../../hooks/useScreenSize';

// Status Icons
import { ReactComponent as FinishedIcon } from '../../assets/icons/ok.svg';
import { ReactComponent as PendingIcon } from '../../assets/icons/pending.svg';
import { ReactComponent as UnfinishedIcon } from '../../assets/icons/warning.svg';
import { getImageUrl } from '../../utils/functions/getImageUrl';

const statusIcons = {
    "finished": <FinishedIcon />,
    "sketch": <PendingIcon />,
    "unfinished": <UnfinishedIcon />
}

type ColumnProps = {
    name: string;
    link?: string;
    techs: Array<string>;
    outro?: string;
}

export default function Projects({ ...props }) {
    const [projectIndex, setProjectIndex] = useState(0);
    const [moreInfoExpanded, setMoreInfoExpanded] = useState(true);

    const { isScreenWide } = useScreenSize();

    const imageRef = useRef<any>();

    useEffect(() => {
        if (imageRef.current !== null) {
            imageRef.current.classList.toggle("fadeOut")
            setTimeout(() => {
                imageRef.current.src = getImageUrl(`../../assets/projects/${projects[projectIndex].image_uri}.png`)
            }, 350);
            setTimeout(() => {
                imageRef.current.classList.toggle("fadeOut")
            }, 500);
        }
    }, [projectIndex])

    /* const projectAccentColorRGB = projects[projectIndex].accent_color.replace(/[^\d,]/g, '').split(','); */
    const projectStatus = projects[projectIndex].status as string;
    const projectStatusIcon = (statusIcons as any)[projectStatus];

    return (
        <section className='section wrapper' id='projects'>
            <header className='subtitle'>
                <h3><Translate>Projects</Translate></h3>
                <div />
            </header>
            <div className='carrousel'>
                <div className='info'>
                    <div
                        style={{
                            background: `linear-gradient(90deg, rgba(${projects[projectIndex].accent_color}, 0.65) 0%, rgba(${projects[projectIndex].accent_color}, 0.25) 57.29%, rgba(${projects[projectIndex].accent_color}, 0) 100%)`,
                        }}
                        className='headerDecoration'
                    />
                    <div className='infoHeader'>
                        <div className='statusHolder'>
                            {projectStatusIcon}
                            <div />
                            <p><Translate>{projectStatus}</Translate></p>
                        </div>
                        {
                            projects[projectIndex].name.length < 7 && !isScreenWide ?
                                <svg
                                    viewBox="0 0 55 17"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <text
                                        fill='var(--primary-color-01)'
                                        style={{ font: "900 1.65rem Roboto Slab", alignSelf: "center", textAlign: "center", textAnchor: "middle" }}
                                        x="50%" y="82.5%"
                                    >
                                        {projects[projectIndex].name}
                                    </text>
                                </svg>
                                :
                                <h2><Translate>{projects[projectIndex].name}</Translate></h2>

                        }
                        <h4><Translate>{projects[projectIndex].description}</Translate></h4>
                    </div>
                    <a target={"_blank"} rel="noreferrer" href={projects[projectIndex].link}>
                        <Button
                            style={{
                                backgroundColor: `rgb(${projects[projectIndex].accent_color})`,
                                color: "#FFFFFF",
                                paddingBlock: `1.5rem`, paddingInline: "2.75rem",
                                textTransform: "capitalize"
                            }}
                            title={projects[projectIndex].link ? TranslateText("VISIT PROJECT") : TranslateText("WORK IN PROGRESS")}
                        />
                    </a>
                    {
                        projects[projectIndex].technologies.length >= 1 &&
                        <div className='moreInfo' onClick={() => setMoreInfoExpanded(!moreInfoExpanded)}>
                            <p style={{ textTransform: "capitalize" }}><Translate>{moreInfoExpanded ? "LESS INFO" : "MORE INFO"}</Translate></p>
                            <DownArrow
                                fill='var(--primary-color-01)'
                                viewBox='0 0 24 24'
                                width={`2.4rem`}
                                height={`2.4rem`}
                                style={{ transform: moreInfoExpanded ? `rotate(180deg)` : `rotate(0deg)`, transition: "0.35s" }}
                            />
                        </div>
                    }
                </div>
                {/* <div className='column2'>
                    <img
                        style={{ marginTop: !isScreenWide && projects[projectIndex].technologies.length < 1 ? `3rem` : 0 }}
                        ref={imageRef}
                        src={require(`../../assets/projects/${projects[0].image_uri}.png`)}
                        alt="Imagem representando o projeto"
                    />
                    <div className='sectionDots'>
                        <ChevronLeft
                            style={{ cursor: projectIndex === 0 ? "initial" : "pointer", transition: "0.5s" }}
                            fill={projectIndex === 0 ? "#808080" : 'var(--primary-color-01)'}
                            onClick={() => {
                                if (projectIndex > 0) {
                                    setProjectIndex(projectIndex - 1)
                                }
                            }}
                        />
                        <ul>
                            {
                                projects.map(function (project, index) {
                                    const isCurrentProject = index === projectIndex;
                                    return (
                                        <li onClick={() => setProjectIndex(index)} key={index}>
                                            <div style={{ backgroundColor: isCurrentProject ? `rgb(${project.accent_color})` : "var(--primary-color-01)" }} className={`${isCurrentProject && "bulletUp"}`} />
                                        </li>
                                    )
                                })}

                        </ul>
                        <ChevronLeft
                            style={{ cursor: projectIndex === projects.length - 1 ? "initial" : "pointer", transition: "0.5s", transform: "rotate(180deg)" }}
                            fill={projectIndex === projects.length - 1 ? "#808080" : 'var(--primary-color-01)'}
                            onClick={() => {
                                if (projectIndex < projects.length - 1) {
                                    setProjectIndex(projectIndex + 1)
                                }
                            }}
                        />
                    </div>
                </div> */}
                <img
                    style={{ marginTop: !isScreenWide && projects[projectIndex].technologies.length < 1 ? `3rem` : 0, filter: `drop-shadow(0px 0px 10px rgba(${projects[projectIndex].accent_color}, 0.5))` }}
                    ref={imageRef}
                    src={getImageUrl(`../../assets/projects/${projects[0].image_uri}.png`)}
                    alt="Imagem representando o projeto"
                />
            </div>
            <div className='sectionDots'>
                <ChevronLeft
                    style={{ cursor: projectIndex === 0 ? "initial" : "pointer", transition: "0.5s" }}
                    fill={projectIndex === 0 ? "#808080" : 'var(--primary-color-01)'}
                    onClick={() => {
                        if (projectIndex > 0) {
                            setProjectIndex(projectIndex - 1)
                        }
                    }}
                />
                <ul>
                    {
                        projects.map(function (project, index) {
                            const isCurrentProject = index === projectIndex;
                            return (
                                <li onClick={() => setProjectIndex(index)} key={index}>
                                    <div style={{ backgroundColor: isCurrentProject ? `rgb(${project.accent_color})` : "var(--primary-color-01)" }} className={`${isCurrentProject && "bulletUp"}`} />
                                </li>
                            )
                        })}

                </ul>
                <ChevronLeft
                    style={{ cursor: projectIndex === projects.length - 1 ? "initial" : "pointer", transition: "0.5s", transform: "rotate(180deg)" }}
                    fill={projectIndex === projects.length - 1 ? "#808080" : 'var(--primary-color-01)'}
                    onClick={() => {
                        if (projectIndex < projects.length - 1) {
                            setProjectIndex(projectIndex + 1)
                        }
                    }}
                />
            </div>
            {
                projects[projectIndex].technologies.length >= 1 &&
                <CSSTransition
                    key={1}
                    in={moreInfoExpanded}
                    timeout={500}
                    classNames="item"
                    unmountOnExit
                >
                    <div className='projectTechnologies'>
                        {
                            projects[projectIndex].technologies.length > 1 &&
                            <h5><Translate>Technologies used to build the application services:</Translate></h5>
                        }
                        <ul className='projectTechs'>
                            <ul className='projectTechs'>
                                {
                                    projects[projectIndex].technologies.map((column: ColumnProps, index) =>
                                        <li key={index}>
                                            <div className='column'>
                                                <a target={"_blank"} rel="noreferrer" href={column.link} className='title'>
                                                    <h6 className={column.hasOwnProperty('link') ? 'link' : ""}>{column.name}</h6>
                                                    {
                                                        column.hasOwnProperty('link') &&
                                                        <LinkIcon />
                                                    }
                                                </a>
                                                <ul key={`${index}_tech`}>
                                                    {
                                                        column.techs.map((tech, index) => <li key={index}>{tech}</li>)
                                                    }
                                                </ul>
                                                {
                                                    column.hasOwnProperty('outro') &&
                                                    <p><Translate>{column.outro}</Translate></p>
                                                }
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </ul>
                    </div>
                </CSSTransition>
            }
            <CSSTransition
                key={2}
                in={moreInfoExpanded}
                timeout={500}
                classNames="item"
                unmountOnExit
            >
                <a target={"_blank"} rel="noreferrer" href="https://github.com/theduardomaciel">
                    <Button disableHover title={TranslateText("Check other repositories")} style={{ fontSize: `1.4rem`, paddingInline: `3rem` }} Icon={GithubLogo} iconSize={`1.8rem`} />
                </a>
            </CSSTransition>
        </section>
    );
}