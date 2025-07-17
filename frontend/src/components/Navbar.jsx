import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDark from '../assets/logo-artec-2.png';
import LogoLight from '../assets/logo-artec-.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll styling
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // Load user from sessionStorage
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                credentials: 'include' // Important for cookies
            });
            
            if (response.ok) {
                sessionStorage.removeItem('user');
                setUser(null);
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-transparent backdrop-blur-md' : 'bg-white shadow-md'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center py-4 px-8">
                <div className="flex items-center gap-2">
                    <img
                        src={scrolled ? LogoLight : LogoDark}
                        alt="ARTEC INT"
                        className="h-10 transition-all duration-300"
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span
                                className={`font-medium ${scrolled ? 'text-white' : 'text-blue-700'
                                    }`}
                            >
                                Welcome {user.first_name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className={`px-4 py-2 rounded transition duration-300 ${scrolled
                                        ? 'border border-white text-white hover:bg-white hover:text-blue-700'
                                        : 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                                    }`}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className={`px-4 py-2 rounded border transition duration-300 ${scrolled
                                        ? 'border-white text-white hover:bg-white hover:text-blue-700'
                                        : 'border-zinc-400 text-gray-600 hover:bg-blue-700 hover:text-white'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                className={`px-4 py-2 rounded transition duration-300 ${scrolled
                                        ? 'border border-white text-white hover:bg-white hover:text-blue-700'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                Contact us
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;