import { getStatus } from '@/store/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Loader } from '../common';

const COLORS = ['#395556', '#4285F4', '#EE6C4D'];

const StatusChart = () => {
  const [selectedStat, setSelectedStat] = useState('this_week');
  const dispatch = useDispatch();
  const { statusData } = useSelector((s) => s.statsReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getStatus({
        payload: {
          query: selectedStat
        },
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, [dispatch, navigate, selectedStat]);

  const handleChange = (e) => {
    setSelectedStat(e.target.value);
  };

  return (
    <div className='min-w-3/4'>
      <div className='grid grid-cols-2 pb-4'>
      <h1 className='font-bold'>Tour Status</h1>
      <select value={selectedStat} onChange={handleChange}>
        <option value="this_week">This Week</option>
        <option value="this_month">This Month</option>
        <option value="last_3_months">Last 3 Months</option>
        <option value="last_6_months">Last 6 Months</option>
      </select>
      </div>

      <ResponsiveContainer width={300} height={300}>
        <PieChart>
        <Legend
            verticalAlign="top"
            align="center"
            layout="horizontal"
            iconSize={10}
            iconType="square"
          />
          <Pie
            data={statusData?.data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}`}
          >
            {statusData?.data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie> 
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusChart;
