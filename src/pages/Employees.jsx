import React, { useEffect, useState } from 'react';
import API from '../components/api';

export default function Employees(){
  const [rows, setRows] = useState([]);
  useEffect(()=>{ API.get('/employees').then(({data})=>setRows(data)); },[]);
  return (
    <div className="card">
      <h2 className="title mb-4">Employees</h2>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600">
            <tr><th className="p-2">ID</th><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Department</th><th className="p-2">Joining</th><th className="p-2">Balance</th></tr>
          </thead>
          <tbody>
            {rows.map(e=> (
              <tr key={e.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{e.id}</td><td className="p-2">{e.name}</td><td className="p-2">{e.email}</td><td className="p-2">{e.department}</td><td className="p-2">{e.joiningDate}</td><td className="p-2">{e.leaveBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
