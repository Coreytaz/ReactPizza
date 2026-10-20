declare module '*.svg' { const src: string; export default src; }
declare module '*.png' { const src: string; export default src; }
declare module '*.module.scss' { const styles: { readonly [className: string]: string }; export default styles; }
