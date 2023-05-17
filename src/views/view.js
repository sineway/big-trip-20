/**
 * @abstract
 * @template S
 */
class View extends HTMLElement {
  constructor() {
    super();

    /**
     * @type {S}
     */
    this.state = null;
  }

  /**
   * @param {string} [selector]
   * @param {SafeHtml} [outerHtml]
   */
  render(selector, outerHtml) {
    if (arguments.length === 2) {
      this.querySelector(selector).outerHTML = String(outerHtml);
    } else {
      this.innerHTML = String(this.createHtml());
    }
  }

  /**
   * @return {SafeHtml}
   */
  createHtml() {
    return null;
  }

  /**
   * @param {string} type
   * @param {any} [detail]
   * @return {boolean}
   */
  notify(type, detail = null) {
    const cancelable = true;
    const bubbles = true;
    const event = new CustomEvent(type, {detail, cancelable, bubbles});

    return this.dispatchEvent(event);
  }
}

export default View;
