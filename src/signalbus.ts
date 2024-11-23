type Listener = (data?: any) => void;

class SignalBus {
  private events: { [event: string]: Listener[] };

  constructor() {
    this.events = {}; // Initialize event store
  }

  /**
   * Subscribe to an event or a wildcard pattern.
   * @param event The name of the event or pattern.
   * @param listener The function to execute when the event is emitted.
   */
  on(event: string, listener: Listener): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  /**
   * Unsubscribe from an event or a specific listener.
   * @param event The name of the event.
   * @param listener The listener to remove (optional, removes all listeners if not provided).
   */
  off(event: string, listener?: Listener): void {
    if (!this.events[event]) return;

    if (listener) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    } else {
      delete this.events[event];
    }
  }

  /**
   * Dispatch an event with optional data, including support for wildcard listeners.
   * @param event The name of the event to emit.
   * @param data Optional data to pass to the listeners.
   */
  emit(event: string, data?: any): void {
    // Emit to exact event listeners
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data));
    }

    // Emit to wildcard listeners
    Object.keys(this.events)
      .filter((key) => this.isWildcardMatch(key, event))
      .forEach((wildcardEvent) => {
        this.events[wildcardEvent].forEach((listener) => listener(data));
      });
  }

  /**
   * Subscribe to an event once, then auto-unsubscribe after it's handled.
   * @param event The name of the event to subscribe to.
   * @param listener The function to execute when the event is emitted.
   */
  once(event: string, listener: Listener): void {
    const wrapper = (data?: any) => {
      listener(data);
      this.off(event, wrapper); // Auto-unsubscribe
    };
    this.on(event, wrapper);
  }

  /**
   * Get the count of listeners for a specific event.
   * @param event The name of the event.
   * @returns The number of listeners for the event.
   */
  listenerCount(event: string): number {
    return this.events[event]?.length || 0;
  }

  /**
   * Clear all listeners for a specific event.
   * @param event The name of the event to clear.
   */
  clearEvent(event: string): void {
    delete this.events[event];
  }

  /**
   * Clear all listeners for all events.
   */
  clearAll(): void {
    this.events = {};
  }

  /**
   * Check if an event matches a wildcard pattern.
   * @param pattern The pattern to match (e.g., "user.*").
   * @param event The name of the event to check.
   * @returns True if the event matches the pattern, false otherwise.
   */
  private isWildcardMatch(pattern: string, event: string): boolean {
    const regex = new RegExp(
      `^${pattern.replace(/\*/g, '.*').replace(/\?/g, '.')}$`
    );
    return regex.test(event);
  }
}

export default SignalBus;
