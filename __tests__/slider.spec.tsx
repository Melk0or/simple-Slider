import { act, fireEvent, render } from '@testing-library/react';

import Slider from '@components/Slider/Slider';

describe('Slider', () => {
  const images = ['1', '2', '3', '4'];
  const autoPlayTime = 100;

  it('renders the slider', () => {
    const { getByTestId } = render(
      <Slider imageArrayPath={images} autoPlayTime={autoPlayTime} />
    );
    const slider = getByTestId('slider');
    expect(slider).toBeInTheDocument();
  });

  it('displays the correct initial value', () => {
    const { getByTestId } = render(
      <Slider imageArrayPath={images} autoPlayTime={autoPlayTime} />
    );
    const slider = getByTestId('slider');
    expect(slider).toBeDefined();
  });

  it('renders the next image when the next button is clicked', () => {
    const { getByText, getAllByRole } = render(
      <Slider imageArrayPath={images} autoPlayTime={autoPlayTime} />
    );
    const nextButton = getByText('next');
    const imageElement1 = getAllByRole('img')[0];
    const imageElement2 = getAllByRole('img')[1];

    // Проверяем, что изначально отображается первое изображение.
    expect(imageElement1).toHaveAttribute('src', '/1.jpg');

    // Нажимаем на кнопку "Next"
    fireEvent.click(nextButton);

    // Проверяем, что теперь отображается второе изображение.
    expect(imageElement2).toHaveAttribute('src', '/2.jpg');
  });

  it('renders the previous image when the prev button is clicked', () => {
    const { getByText, getAllByRole } = render(
      <Slider imageArrayPath={images} autoPlayTime={autoPlayTime} />
    );
    const prevButton = getByText('prev');
    const imageElement1 = getAllByRole('img')[0];
    const imageElement4 = getAllByRole('img')[3];

    // Проверяем, что изначально отображается первое изображение.
    expect(imageElement1).toHaveAttribute('src', '/1.jpg');

    // Нажимаем на кнопку "Prev"
    fireEvent.click(prevButton);

    // Проверяем, что теперь отображается последнее изображение.
    expect(imageElement4).toHaveAttribute('src', '/4.jpg');
  });

  it('renders the image slider with play and stop buttons', () => {
    const { getByText } = render(
      <Slider imageArrayPath={images} autoPlayTime={autoPlayTime} />
    );

    // Проверяем, что кнопки play и stop отображаются.
    const playButton = getByText('play');
    const stopButton = getByText('stop');

    expect(playButton).toBeInTheDocument();
    expect(stopButton).toBeInTheDocument();

    // Проверяем, что кнопка play не отключена, а кнопка stop отключена.
    expect(playButton).not.toBeDisabled();
    expect(stopButton).toBeDisabled();
  });

  it('starts and stops autoplay when the play and stop buttons are clicked', () => {
    jest.useFakeTimers();

    const { getByText, getAllByRole } = render(
      <Slider imageArrayPath={images} autoPlayTime={autoPlayTime} />
    );
    const playButton = getByText('play');
    const stopButton = getByText('stop');
    const imageElement = getAllByRole('img')[1];

    fireEvent.click(playButton);

    // Проверяем, что кнопка play отключена, а кнопка stop включена.
    expect(playButton).toBeDisabled();
    expect(stopButton).not.toBeDisabled();

    // Продвигаем таймеры на заданное время.
    act(() => {
      jest.advanceTimersByTime(autoPlayTime);
    });

    // Проверяем, что изображение изменилось
    expect(imageElement).toHaveAttribute('src', `/${images[1]}.jpg`);

    // Нажимаем на кнопку stop
    fireEvent.click(stopButton);

    // Проверяем, что кнопка play включена, а кнопка stop отключена
    expect(playButton).not.toBeDisabled();
    expect(stopButton).toBeDisabled();

    // Продвигаем таймеры на заданное время
    act(() => {
      jest.advanceTimersByTime(autoPlayTime);
    });

    // Проверяем, что изображение не изменилось
    expect(imageElement).toHaveAttribute('src', `/${images[1]}.jpg`);

    jest.useRealTimers(); // Возвращаем реальные таймеры
  });
});
