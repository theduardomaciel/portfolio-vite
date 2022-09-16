import React, { useEffect, useRef } from 'react';

import styles from './starfield.module.css';

// App Context and Hooks
import { useScreenSize } from '../../hooks/useScreenSize';
import { useAppContext } from '../../context/appContext';

// Original code which has been adapted: https://www.youtube.com/watch?v=py-Qls7Jd3I

const STARS_NUM = 200;
const STAR_SIZE = 0.005; //tamanho máximo da estrela como fração da largura da tela
const STAR_SPEED = 0.05;

function randomSign() {
    return Math.random() >= 0.5 ? 1 : -1;
}

/* type Props = {
    clipPath?: string;
} */

export default function StarField({ ...props }) {
    const canvasRef = useRef(null)

    const { isScreenWide, height, width } = useScreenSize();
    const { LOD } = useAppContext();

    const blobDefaultWidth = isScreenWide ? width / 2 : width;

    const blobHeight = props.height ? props.height : blobDefaultWidth;
    const blobWidth = props.width ? props.width : blobDefaultWidth;

    function createCanvas() {
        const canvasRefCurrent = canvasRef.current as any;
        const canvas = canvasRefCurrent as HTMLCanvasElement;

        canvas.height = blobHeight;
        canvas.width = blobWidth;

        return canvas;
    }

    function renderStars(canvas: HTMLCanvasElement) {
        // Determinamos as estrelas
        let stars = [] as any;
        const starSpeed = STAR_SPEED * canvas.width;
        const xv = starSpeed * randomSign() * Math.random();
        // A função "randomSign()" determina a direção em que a estrela vai andar (esquerda ou direita)

        // Using Pythagoras' theorem, yv = sqrt(starSpeed^2 - xv^2)
        const yv = Math.sqrt(Math.pow(starSpeed, 2) - Math.pow(xv, 2)) * randomSign();
        for (let i = 0; i < STARS_NUM; i++) {
            let speedMultiplier = Math.random() * 1.5 + 0.5;
            stars[i] = {
                r: Math.random() * STAR_SIZE * canvas.width / 2, //raio
                x: Math.floor(Math.random() * canvas.width), // posição x
                y: Math.floor(Math.random() * canvas.height), // posição y
                xv: xv * speedMultiplier, // velocidade horizontal (x)
                yv: yv * speedMultiplier // velocidade vertical (y)
            }
        }
        return stars;
    }

    const requestRef = React.useRef<any>();
    const previousTimeRef = React.useRef<any>();

    function starsAnimation(time: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, stars: any) {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            const theme = window.localStorage.getItem('currentTheme');

            // Em seguida, determinamos o plano de fundo do canvas
            context.fillStyle = 'dark';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.clearRect(0, 0, canvas.width, canvas.height);

            // E renderizamos as estrelas
            context.fillStyle = theme === "light" ? 'white' : "black";
            for (let i = 0; i < STARS_NUM; i++) {
                context.beginPath();
                context.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI * 2);
                context.fill();

                // update the star's x position
                stars[i].x += stars[i].xv * deltaTime * 0.001;

                // reposition the star to the other side if it goes off screen
                if (stars[i].x < 0 - stars[i].r) {
                    stars[i].x = canvas.width + stars[i].r;
                } else if (stars[i].x > canvas.width + stars[i].r) {
                    stars[i].x = 0 - stars[i].r;
                }

                // update the star's y position
                stars[i].y += stars[i].yv * deltaTime * 0.001;

                // reposition the star to the other side if it goes off screen
                if (stars[i].y < 0 - stars[i].r) {
                    stars[i].y = canvas.height + stars[i].r;
                } else if (stars[i].y > canvas.height + stars[i].r) {
                    stars[i].y = 0 - stars[i].r;
                }
            }
        }

        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame((time: number) => starsAnimation(time, context, canvas, stars));
    }

    useEffect(() => {
        if (LOD !== "low") {
            const canvas = createCanvas();
            const context = canvas.getContext("2d") as any;
            const stars = renderStars(canvas)

            requestRef.current = requestAnimationFrame((time: number) => starsAnimation(time, context, canvas, stars));
            return () => cancelAnimationFrame(requestRef.current);
        }
    }, [LOD])

    const element = LOD === "low" ?
        <div className={styles.canvas} style={{ width: blobWidth, height: blobHeight }} {...props}></div>
        :
        <canvas className={styles.canvas} style={{ width: blobWidth, height: blobHeight }} ref={canvasRef} {...props}></canvas>;

    return element;
}