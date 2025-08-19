import React, { useState } from 'react';
import API from '../components/api';

export default function ApplyLeave(){
  const [email, setEmail] = useState('');
  const [emp, setEmp] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');

  const fetchEmp = async () => {
    if(!email) return;
    try {
      const { data } = await API.get(`/employees/by-email`, { params: { email } });
      setEmp(data);
      setMsg('');
    } catch (e) {
      setEmp(null);
      setMsg('Employee not found. Please ask HR to add you.');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/leaves', { email, startDate, endDate, reason });
      setMsg('Leave submitted ✅');
      setStartDate(''); setEndDate(''); setReason('');
    } catch (e) {
      setMsg(e.response?.data?.error || 'Server error');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card">
        <h2 className="title mb-4">Apply for Leave</h2>
        <form onSubmit={submit} className="grid gap-3">
          <label className="label">Email</label>
          <input className="input" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onBlur={fetchEmp} required/>

          <label className="label">Employee ID</label>
          <input className="input" value={emp?.id || ''} readOnly />

          <label className="label">Name</label>
          <input className="input" value={emp?.name || ''} readOnly />

          <label className="label">Department</label>
          <input className="input" value={emp?.department || ''} readOnly />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Start Date</label>
              <input type="date" className="input" value={startDate} onChange={e=>setStartDate(e.target.value)} required/>
            </div>
            <div>
              <label className="label">End Date</label>
              <input type="date" className="input" value={endDate} onChange={e=>setEndDate(e.target.value)} required/>
            </div>
          </div>

          <label className="label">Reason (optional)</label>
          <textarea className="input" rows="3" placeholder="Optional reason" value={reason} onChange={e=>setReason(e.target.value)} />

          <button className="btn-primary mt-2" type="submit">Submit Leave</button>
        </form>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>

      <div className="hidden md:block card">
        <div className="title mb-2">Tips</div>
        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
          <li>Use your official email to auto-fill your info.</li>
          <li>End date must be on/after start date.</li>
          <li>Balance is checked when you submit and when HR approves.</li>
        </ul>
      </div>
    </div>
  );
}
