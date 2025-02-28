export class EventDispatcher implements EventTarget {
  private listeners: Map<string, EventListenerOrEventListenerObject[]> =
    new Map();

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean,
  ): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    if (callback) {
      const cbs = this.listeners.get(type);
      cbs?.push(callback);
    }
  }
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void {
    if (this.listeners.has(type)) {
      const cbs = this.listeners.get(type);
      if (cbs) {
        const result = cbs.reduce<EventListenerOrEventListenerObject[]>(
          (retVal, listener) => {
            if (listener !== callback) {
              retVal.push(listener);
            }
            return retVal;
          },
          [],
        );
        this.listeners.set(type, result);
      }
    }
  }
  dispatchEvent(event: Event): boolean {
    return true;
  }
}
