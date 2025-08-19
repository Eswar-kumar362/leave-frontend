import React from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }){
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 bg-white/70 backdrop-blur border-b border-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-brand-700">LeaveMgmt</Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/" className="hover:text-brand-700">Home</Link>
            <Link to="/employee/apply" className="hover:text-brand-700">Employee</Link>
            <Link to="/hr/login" className="hover:text-brand-700">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mt-12 border-t bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} LeaveMgmt. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
