'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>愛心手工餅乾</span>
            </Link>
          </div>

          {/* 桌面選單 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-gray-800 hover:text-primary px-3 py-2"
              style={{ transition: 'color 0.15s ease-in-out' }}
            >
              全部商品
            </Link>
            <Link 
              href="/about" 
              className="text-gray-800 hover:text-primary px-3 py-2"
              style={{ transition: 'color 0.15s ease-in-out' }}
            >
              關於我們
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-800 hover:text-primary px-3 py-2"
              style={{ transition: 'color 0.15s ease-in-out' }}
            >
              聯絡我們
            </Link>
          </div>

          {/* 使用者圖示與購物車 */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/account" 
              className="text-gray-800 hover:text-primary p-2"
              style={{ transition: 'color 0.15s ease-in-out' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-800 hover:text-primary p-2"
              style={{ transition: 'color 0.15s ease-in-out' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            {/* 漢堡選單按鈕 (僅在行動裝置顯示) */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden focus:outline-none p-2"
              aria-label="開啟選單"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 行動裝置選單 (漢堡選單打開時顯示) */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/products" 
                className="block px-4 py-2 text-gray-800 hover:bg-primary-light rounded-md"
                style={{ transition: 'background-color 0.15s ease-in-out' }}
                onClick={() => setIsMenuOpen(false)}
              >
                全部商品
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-2 text-gray-800 hover:bg-primary-light rounded-md"
                style={{ transition: 'background-color 0.15s ease-in-out' }}
                onClick={() => setIsMenuOpen(false)}
              >
                關於我們
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-2 text-gray-800 hover:bg-primary-light rounded-md"
                style={{ transition: 'background-color 0.15s ease-in-out' }}
                onClick={() => setIsMenuOpen(false)}
              >
                聯絡我們
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 