import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="card">
        <h1 className="text-3xl font-extrabold mb-3">Welcome to LeaveMgmt</h1>
        <p className="text-gray-600 mb-6">Quickly apply for leaves as an employee, or manage requests as HR. Clean, fast and simple.</p>
        <div className="flex gap-3">
          <Link to="/employee/apply" className="btn-primary">I am an Employee</Link>
          <Link to="/hr/login" className="btn-ghost">I am an Admin (HR)</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card"><div className="title mb-2">Apply Fast</div><p className="text-sm text-gray-600">Auto-fills your info from email.</p></div>
        <div className="card"><div className="title mb-2">Smart Checks</div><p className="text-sm text-gray-600">No overlaps. No invalid dates.</p></div>
        <div className="card"><div className="title mb-2">HR Dashboard</div><p className="text-sm text-gray-600">Approve/Reject/Pending in clicks.</p></div>
        <div className="card"><div className="title mb-2">Balance Tracking</div><p className="text-sm text-gray-600">Auto-deduct on approval.</p></div>
      </div>
    </div>
  )
}
