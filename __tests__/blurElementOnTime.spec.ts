import { blurElementOnTime } from '@components/Slider/utils/blurElementOnTime';

describe('blurElementOnTime', () => {
  let element: HTMLElement;

  // Создаем фиктивный DOM элемент для тестирования.
  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  // Удаляем фиктивный элемент после каждого теста.
  afterEach(() => {
    document.body.removeChild(element);
  });

  it('applies blur to the element', () => {
    const blurValue = 5;
    const timeValue = 1000;

    blurElementOnTime(element, blurValue, timeValue);

    // Проверяем, что размытие применено
    expect(element.style.filter).toBe(`blur(${blurValue}px)`);
  });

  it('removes blur from the element after the specified time', (done) => {
    const blurValue = 5;
    const timeValue = 100; // Используем короткое время для тестирования

    blurElementOnTime(element, blurValue, timeValue);

    // Проверяем, что размытие применено.
    expect(element.style.filter).toBe(`blur(${blurValue}px)`);

    // Ждем, пока размытие будет снято
    setTimeout(() => {
      expect(element.style.filter).toBe('blur(0px)');
      done();
    }, timeValue);
  });

  it('does nothing if the element is null', () => {
    const blurValue = 5;
    const timeValue = 1000;

    // Вызываем функцию с null элементом.
    blurElementOnTime(null, blurValue, timeValue);

    // Проверяем, что функция ничего не делает.
    expect(element.style.filter).toBe('');
  });
});
