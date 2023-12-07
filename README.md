# Setup

```bash
npm install react-histoslider
```

## Usage

```jsx
import React from 'react';
import Histoslider from 'react-histoslider';

const App = () => {
    const data = Array.from({ length: 1000 }, () => Math.random() * 100);
  return (
    <Histoslider
      value={value}
    />
  );
};
```

## License

MIT
