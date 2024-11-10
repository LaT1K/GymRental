import React from 'react';

const Card = ({ title, children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {children}
    </div>
);

export default Card;
