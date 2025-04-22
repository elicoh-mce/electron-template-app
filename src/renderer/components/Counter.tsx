import React, { useState } from 'react';

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontSize: '24px'
        }}>
            <h1>Counter: {count}</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => setCount(count - 1)}
                    style={{ padding: '10px 20px', fontSize: '20px' }}
                >
                    Decrease
                </button>
                <button
                    onClick={() => setCount(count + 1)}
                    style={{ padding: '10px 20px', fontSize: '20px' }}
                >
                    Increase
                </button>
            </div>
        </div>
    );
};

export default Counter; 