declare module '*.scss';
declare module '*.css';
declare module '*.png';
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}