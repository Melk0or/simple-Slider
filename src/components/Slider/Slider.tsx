import { FC, useRef, useState } from 'react';

import { blurElementOnTime } from './utils/blurElementOnTime';

import SliderElement from '../SliderElement/SliderElement';

import styles from './Slide.module.scss';

interface SliderProps {
  /**
   * Массив путей картинок.
   */
  imageArrayPath: string[];
  /**
   * Время переключения картинок (в миллисекундах).
   */
  autoPlayTime: number;
}

const Slider: FC<SliderProps> = ({ imageArrayPath, autoPlayTime }) => {
  const [count, setCount] = useState(1);
  const [isPlay, setIsPlay] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Обработчик для клика next.
  const handleNextClick = () => {
    setCount((prevState) => {
      if (prevState > 3) {
        return 1;
      }
      return prevState + 1;
    });

    blurElementOnTime(imageWrapperRef.current, 5, 100);
  };

  // Обработчик для клика prev.
  const handlePrevClick = () => {
    setCount((prevState) => {
      if (prevState < 2) {
        return imageArrayPath.length;
      }
      return prevState - 1;
    });

    blurElementOnTime(imageWrapperRef.current, 5, 100);
  };

  // Обработчик для автоматического проигрывания.
  const handlePlayClick = () => {
    intervalRef.current = setInterval(handleNextClick, autoPlayTime);
    setIsPlay((prevState) => !prevState);
  };

  // Обработчик для остановки автоматического проигрывания.
  const handleStopClick = () => {
    clearInterval(intervalRef.current);
    setIsPlay((prevState) => !prevState);
  };
  return (
    <>
      <div
        ref={imageWrapperRef}
        className={styles.slider}
        data-testid="slider"
        style={{
          transform: 'translateX(' + String((count - 1) * -1080) + 'px)',
        }}
      >
        {imageArrayPath.map((src, index) => (
          <SliderElement src={src} key={index} />
        ))}
      </div>

      <div className={styles.buttonsWrapper}>
        <button onClick={handlePrevClick}>prev</button>
        <button disabled={isPlay} onClick={handlePlayClick}>
          play
        </button>
        <button disabled={!isPlay} onClick={handleStopClick}>
          stop
        </button>
        <button onClick={handleNextClick}>next</button>
      </div>
    </>
  );
};

export default Slider;
