export const getImageUrl = (name: string) => {
    return new URL(`../../assets/projects/${name}.png`, import.meta.url).href
}