/**
 *
 * @param el Дом элемент.
 * @param blurValue Значение размытия.
 * @param timeValue Количество миллисекунд на которое навешивается размытие.
 */
export const blurElementOnTime = (
  el: HTMLElement | null,
  blurValue: number,
  timeValue: number
) => {
  if (!el) return;

  el.style.filter = `blur(${blurValue}px)`;

  setTimeout(() => {
    el.style.filter = `blur(0px)`;
  }, timeValue);
};
