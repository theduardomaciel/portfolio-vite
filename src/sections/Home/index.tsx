import React, { useEffect, useState } from 'react';

// Components
import Button from '../../components/Button';
import SocialMedia from '../../components/SocialMedia';

import Translate from '../../components/Translate';

// Hooks and Functions
import { useAppContext } from '../../context/appContext';

import { useScreenSize } from '../../hooks/useScreenSize';
import blobShape from '../../utils/functions/generateBlob';

// Decoration
import { ReactComponent as Stars } from '../../assets/stars.svg';
import { ReactComponent as Rocket } from '../../assets/rocket.svg';

import Planet from '../../components/Planet';
import AstronautDarkMode from '../../assets/images/astronauta_dark.png';
import StarField from '../../components/Starfield';

export default function Home({ ...props }) {
    const [blobPaths, setBlobsPaths] = useState(["", ""])

    const { theme } = useAppContext();
    const { isScreenWide, width } = useScreenSize();

    const blobWidth = isScreenWide ? width / 2 : width;

    useEffect(() => {
        function getBlobPath(size: number) {
            const { path } = blobShape({ size: size, growth: 5, edges: 10, seed: null });
            return path;
        }
        setInterval(() => {
            const blobWidth = isScreenWide ? width / 2 : width;
            setBlobsPaths([
                getBlobPath(blobWidth),
                getBlobPath(blobWidth),
            ])
        }, 5 * 1000)

        // Chamamos a função uma vez para que o usuário não tenha que esperar 5 segundos para ver o efeito.
        setBlobsPaths([
            getBlobPath(blobWidth),
            getBlobPath(blobWidth),
        ])
    }, [])

    return (
        <section id='home'>
            <header>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <h2 style={{ textTransform: "capitalize" }}>
                        <Translate>HI, I'M</Translate>
                    </h2>
                    <h1>EDUARDO  <br /> MACIEL</h1>
                </div>
                <p><Translate>Fullstack web and mobile developer</Translate></p>
                <a href="/#contact">
                    <Button title='Contact' />
                </a>
                <SocialMedia />
            </header>
            <div className='blobContainer holder1' style={{ justifyContent: "flex-start", maxWidth: width }} >
                <Planet className='planet' />
                <div className='blob1' style={{ WebkitClipPath: `url(#blob1)`, clipPath: `url(#blob1)` }}>
                    {/* <div className='rocket'>
                        <Rocket />
                    </div> */}
                    <img
                        src={AstronautDarkMode}
                        style={{ filter: theme === "dark" ? "none" : "invert()" }}
                        width={((document.documentElement.clientWidth) * 239) / document.documentElement.clientWidth}
                        height={((document.documentElement.clientWidth) * 239) / document.documentElement.clientWidth}
                    />
                    <Rocket className='rocket' width={75} />
                    <StarField />
                </div>
            </div>
            <div className='blobContainer holder2' style={{ justifyContent: "flex-end", maxWidth: width }}>
                <div className='blob2' style={{ WebkitClipPath: `url(#blob2)`, clipPath: `url(#blob2)` }}>
                    <Stars width={(document.documentElement.clientWidth * 58) / 500} className='stars' />
                    <img
                        src={AstronautDarkMode}
                        style={{ filter: theme === "dark" ? "none" : "invert()" }}
                        width={((document.documentElement.clientWidth) * 239) / document.documentElement.clientWidth}
                        height={((document.documentElement.clientWidth) * 239) / document.documentElement.clientWidth}
                    />
                    <Rocket className='rocket2' width={75} />
                    <StarField />
                </div>
            </div>
            <svg style={{ position: "absolute", left: 0, zIndex: -1 }} width={blobWidth} height={blobWidth} viewBox={`0 0 ${blobWidth} ${blobWidth}`}>
                <defs>
                    <clipPath id="blob1">
                        <path className='blob1' d={blobPaths[0]} fill="var(--primary-color-01)" stroke="var(--primary-color-01)" strokeLinecap="round" />
                    </clipPath>
                    <clipPath id="blob2">
                        <path className='blob2' d={blobPaths[1]} fill="var(--primary-color-01)" stroke="var(--primary-color-01)" strokeLinecap="round" />
                    </clipPath>
                </defs>
            </svg>
        </section>
    );
}