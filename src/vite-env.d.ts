declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGElement>>
    export default content
}

declare module '*.mp4' {
    const src: string;
    export default src;
}

/// <reference types="vite/client" />