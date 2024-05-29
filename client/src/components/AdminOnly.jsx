import React from "react";

function AdminOnly({ children }) {
    const login = prompt('Enter your login');
    const password = prompt('Enter your password');

    const display = login === 'admin' && password === 'secretPassword';
    return (
        display ? children : <h1>Access denied</h1>
    );
}

export default AdminOnly;