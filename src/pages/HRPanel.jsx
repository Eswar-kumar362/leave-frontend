import React, { useEffect, useState } from 'react';
import API from '../components/api';

function TabButton({active, children, onClick}){
  return <button onClick={onClick} className={(active?'bg-brand-600 text-white ':'bg-white text-gray-700 ')+'btn rounded-full border'}>{children}</button>
}

export default function HRPanel(){
  const [tab, setTab] = useState('leaves');
  const [rows, setRows] = useState([]);
  const [emps, setEmps] = useState([]);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ name:'', email:'', department:'', joiningDate:'' });

  const loadLeaves = async () => {
    const { data } = await API.get('/leaves');
    setRows(data);
  };
  const loadEmps = async () => {
    const { data } = await API.get('/employees');
    setEmps(data);
  };

  useEffect(()=>{ loadLeaves(); loadEmps(); }, []);

  const update = async (id, status) => {
    try {
      await API.put(`/leaves/${id}`, { status });
      setMsg('Updated ✅');
      loadLeaves();
      loadEmps();
    } catch (e) {
      setMsg(e.response?.data?.error || 'Failed');
    }
  };

  const addEmp = async (e) => {
    e.preventDefault();
    try {
      await API.post('/employees', form);
      setMsg('Employee added ✅');
      setForm({ name:'', email:'', department:'', joiningDate:'' });
      loadEmps();
    } catch (e) {
      setMsg(e.response?.data?.error || 'Failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TabButton active={tab==='leaves'} onClick={()=>setTab('leaves')}>Leave Requests</TabButton>
        <TabButton active={tab==='add'} onClick={()=>setTab('add')}>Add Employee</TabButton>
        <TabButton active={tab==='employees'} onClick={()=>setTab('employees')}>Employees</TabButton>
      </div>

      {msg && <p className="text-sm">{msg}</p>}

      {tab==='leaves' && (
        <div className="card">
          <h3 className="title mb-4">Leave Requests</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-600">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Employee</th>
                  <th className="p-2">Dept</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Start</th>
                  <th className="p-2">End</th>
                  <th className="p-2">Reason</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(l=>(
                  <tr key={l.id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2">{l.id}</td>
                    <td className="p-2">{l.Employee?.name}</td>
                    <td className="p-2">{l.Employee?.department}</td>
                    <td className="p-2">{l.Employee?.email}</td>
                    <td className="p-2">{l.startDate}</td>
                    <td className="p-2">{l.endDate}</td>
                    <td className="p-2">{l.reason}</td>
                    <td className="p-2">{l.status}</td>
                    <td className="p-2 flex gap-2">
                      <button className="btn-primary" onClick={()=>update(l.id,'Approved')}>Approve</button>
                      <button className="btn-ghost" onClick={()=>update(l.id,'Rejected')}>Reject</button>
                      <button className="btn-ghost" onClick={()=>update(l.id,'Pending')}>Pending</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==='add' && (
        <div className="card max-w-xl">
          <h3 className="title mb-4">Add Employee</h3>
          <form onSubmit={addEmp} className="grid gap-3">
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
            <label className="label">Department</label>
            <input className="input" value={form.department} onChange={e=>setForm({...form, department:e.target.value})} required/>
            <label className="label">Joining Date</label>
            <input className="input" type="date" value={form.joiningDate} onChange={e=>setForm({...form, joiningDate:e.target.value})} required/>
            <button className="btn-primary mt-2" type="submit">Save Employee</button>
          </form>
        </div>
      )}

      {tab==='employees' && (
        <div className="card">
          <h3 className="title mb-4">Employees</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-600">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Dept</th>
                  <th className="p-2">Joining</th>
                  <th className="p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {emps.map(e=>(
                  <tr key={e.id} className="odd:bg-white even:bg-gray-50">
                    <td className="p-2">{e.id}</td>
                    <td className="p-2">{e.name}</td>
                    <td className="p-2">{e.email}</td>
                    <td className="p-2">{e.department}</td>
                    <td className="p-2">{e.joiningDate}</td>
                    <td className="p-2">{e.leaveBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
