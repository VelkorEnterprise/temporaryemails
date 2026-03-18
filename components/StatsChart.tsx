import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', emails: 4000, spam: 2400 },
  { name: 'Feb', emails: 3000, spam: 1398 },
  { name: 'Mar', emails: 2000, spam: 9800 },
  { name: 'Apr', emails: 2780, spam: 3908 },
  { name: 'May', emails: 1890, spam: 4800 },
  { name: 'Jun', emails: 2390, spam: 3800 },
  { name: 'Jul', emails: 3490, spam: 4300 },
];

const StatsChart: React.FC = () => {
  return (
    <div className="w-full h-[350px] sm:h-[400px] bg-white/5 rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl backdrop-blur-sm flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Global Threat Protection</h3>
          <p className="text-gray-400 text-xs sm:text-sm">Real-time analysis of spam and malicious emails blocked.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-400"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Threats</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSpam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            tick={{fontSize: 12, fontWeight: 600}} 
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{fontSize: 12, fontWeight: 600}} 
            axisLine={false}
            tickLine={false}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1e293b', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            itemStyle={{color: '#fff', fontWeight: 'bold'}}
            labelStyle={{color: '#94a3b8', marginBottom: '0.5rem'}}
          />
          <Area 
            type="monotone" 
            dataKey="emails" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorEmails)" 
          />
          <Area 
            type="monotone" 
            dataKey="spam" 
            stroke="#2dd4bf" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSpam)" 
          />
        </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsChart;
