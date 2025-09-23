/**
 * 图片放大镜组件Props
 */
export interface ImgZoomProps {
  imgSrc?: string;
  position?: 'left' | 'right';
  scale?: boolean;
  draggable?: boolean;
  style?: React.CSSProperties;
  className?: string;
}
