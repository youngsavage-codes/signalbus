# SignalBus

**SignalBus** is a lightweight and customizable event bus designed for client-side applications. It allows components or modules within an app to communicate through events, without the need for complex state management systems. With support for wildcard events, once listeners, namespaces, and listener management, SignalBus makes event-driven programming simple and efficient.

## Features

- **Wildcard Event Listeners**: Listen to multiple events with wildcard patterns (e.g., `message.*`).
- **Once Listeners**: Register listeners that automatically unsubscribe after being triggered once.
- **Namespaces**: Group events by namespaces to avoid naming conflicts and organize your events.
- **Listener Count & Management**: Get the count of listeners for a specific event and manage them easily.
- **TypeScript Support**: Fully typed for TypeScript users, providing better type safety and autocompletion.

## Installation

To install **SignalBus**, use npm or yarn.

### Using npm:
```bash
npm install signalbus
```


## Basic Usage
***Import SignalBus***

```tsx
import SignalBus from 'signalbus';
``

***Creating an instance of SignalBus***

```tsx
const signalBus = new SignalBus();
```

***Registering an event listener***

```tsx
// A simple listener for the 'messageReceived' event
signalBus.on('messageReceived', (message: string) => {
  console.log('Received message:', message);
});
```

***Emitting an event***

```tsx
// Emit the 'messageReceived' event with a message
signalBus.emit('messageReceived', 'Hello, world!');
```

***Unsubscribing from an event***

```tsx
// Create a listener function
const listener = (message: string) => {
  console.log('Message:', message);
};

// Register the listener
signalBus.on('messageReceived', listener);

// Unsubscribe from the event
signalBus.off('messageReceived', listener);
```

## Advanced Features
# 1. Wildcard Event Listeners
You can use wildcards to listen to multiple events. For example, if you want to listen to all events starting with message, you can do this:

```tsx
signalBus.on('message.*', (data) => {
  console.log('Wildcard listener:', data);
});

// Emit different message events
signalBus.emit('message.received', 'Received a message');
signalBus.emit('message.sent', 'Sent a message');
```

# 2. Once Listeners
Once listeners automatically unsubscribe after being triggered:

```tsx
signalBus.once('messageReceived', (message: string) => {
  console.log('This will be logged only once:', message);
});

signalBus.emit('messageReceived', 'Hello');
signalBus.emit('messageReceived', 'Hello again'); // This will not be logged
```


# 3. Namespaces
You can group events into namespaces to avoid conflicts. For example:

```tsx
// Namespace for user events
signalBus.on('user.login', (user) => {
  console.log('User logged in:', user);
});

// Emit an event within the 'user' namespace
signalBus.emit('user.login', { username: 'john_doe' });
```

# 4. Listener Count & Management
You can check the number of listeners for a particular event:

```tsx
const listenerCount = signalBus.listenerCount('messageReceived');
console.log('Number of listeners for messageReceived:', listenerCount);
```

## Example
Here's an example of how you can use SignalBus to implement communication between different components in a React application.

# Sender Component
```tsx
// Sender.tsx
import React from 'react';
import SignalBus from 'signalbus';

const signalBus = new SignalBus();

const Sender = () => {
  const sendMessage = () => {
    const message = `Message sent at ${new Date().toLocaleTimeString()}`;
    signalBus.emit('messageReceived', message);
  };

  return (
    <div>
      <h2>Sender Component</h2>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default Sender;
```

# Receiver Component
```tsx
// Receiver.tsx
import React, { useState, useEffect } from 'react';
import SignalBus from 'signalbus';

const signalBus = new SignalBus();

const Receiver = () => {
  const [message, setMessage] = useState('No messages yet.');

  useEffect(() => {
    const handleMessage = (msg: string) => {
      setMessage(msg);
    };

    signalBus.on('messageReceived', handleMessage);

    return () => {
      signalBus.off('messageReceived', handleMessage);
    };
  }, []);

  return (
    <div>
      <h2>Receiver Component</h2>
      <p>{message}</p>
    </div>
  );
};

export default Receiver;
```

# Parent Component
```tsx
// Parent.tsx
import React from 'react';
import Sender from './Sender';
import Receiver from './Receiver';

const Parent = () => {
  return (
    <div>
      <h1>SignalBus Communication Example</h1>
      <Sender />
      <Receiver />
    </div>
  );
};

export default Parent;
```

## API
# SignalBus

**on(event: string, listener: Listener): void**
    *event: The name of the event.*
    *listener: A function that will be called when the event is emitted.*

**off(event: string, listener: Listener): void**
    *event: The name of the event.*
    *listener: The listener function to unsubscribe from the event.*

**once(event: string, listener: Listener): void**
    *event: The name of the event.*
    *listener: A function that will be called once when the event is emitted and will automatically unsubscribe after.*

**emit(event: string, data?: any): void**
    *event: The name of the event.*
    *data: Optional data to be passed to the listeners.*

**listenerCount(event: string): number**
    *event: The name of the event.*
    *Returns the number of listeners for a specific event.*



### Explanation of Sections:
- **Installation**: Instructions to install the `SignalBus` library.
- **Basic Usage**: A simple explanation of how to create an instance, register event listeners, and emit events.
- **Advanced Features**: Details on the unique features you've implemented, like wildcards, once listeners, namespaces, and listener management.
- **Example**: Provides code examples of how `SignalBus` could be used in a React project to communicate between components.
- **API**: Lists the main methods of the `SignalBus` class, with explanations of parameters and behavior.
- **License**: Simple mention of the license, customizable according to your actual project.

This README provides developers with a clear understanding of how to integrate and utilize **SignalBus** in their projects.
