import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Typography, Paper } from '@mui/material';

function DashboardChart({ title, data, dataKey, color }) {
  return (
    <Paper elevation={3} className="p-4 mb-6">
      <Typography variant="h6" className="font-bold mb-4">{title}</Typography>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default DashboardChart;
