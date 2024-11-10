import React from 'react';

const Button = ({ onClick, children, type = 'button', className = '', color = 'blue' }) => {
    const baseClasses = 'px-4 py-2 rounded-lg text-white focus:outline-none transition duration-200';
    const colorClasses = color === 'blue' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-red-500 hover:bg-red-700';

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${colorClasses} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
