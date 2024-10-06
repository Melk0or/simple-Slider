import { FC } from "react";

import styles from "./SliderElement.module.scss";

interface SliderElementProps {
  /**
   * Путь до картинки.
   */
  src: string;
}

const SliderElement: FC<SliderElementProps> = ({ src }) => {
  return <img className={styles.image} src={`/${src}.jpg`} />;
};

export default SliderElement;
