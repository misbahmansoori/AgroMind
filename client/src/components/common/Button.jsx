import React from 'react';

const Button = ({
    children, variant="primary",
    className  = "",
    ...props
}) => {
    const styles = {
        primary:
        "bg-green-700 hover:bg-green-800 text-white shadow-lg hover:shadow-xl",

        secondary:
         "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",

         ghost: 
          "hover:bg-gray-100 text-gray-900"
    };

    return (
        <button
        className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${styles[variant]} ${className}`}
        {...props}
        >
            {children}
        </button>
    );
};

export default Button;