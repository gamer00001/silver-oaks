import { getReport } from '@/store/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Loader } from '../common';

const tourData = [
  { name: 'JAN', 'Tailor Made Tours': 10, 'Group Tours': 15, 'Couple Tours': 20 },
  { name: 'FEB', 'Tailor Made Tours': 20, 'Group Tours': 10, 'Couple Tours': 25 },
  { name: 'MAR', 'Tailor Made Tours': 15, 'Group Tours': 18, 'Couple Tours': 22 },
  { name: 'APR', 'Tailor Made Tours': 25, 'Group Tours': 12, 'Couple Tours': 30 },
  { name: 'MAY', 'Tailor Made Tours': 30, 'Group Tours': 20, 'Couple Tours': 35 },
  { name: 'JUN', 'Tailor Made Tours': 18, 'Group Tours': 25, 'Couple Tours': 28 },
  { name: 'JUL', 'Tailor Made Tours': 22, 'Group Tours': 30, 'Couple Tours': 32 },
  { name: 'AUG', 'Tailor Made Tours': 20, 'Group Tours': 10, 'Couple Tours': 25 },
  { name: 'SEP', 'Tailor Made Tours': 15, 'Group Tours': 18, 'Couple Tours': 22 },
  { name: 'OCT', 'Tailor Made Tours': 25, 'Group Tours': 12, 'Couple Tours': 30 },
  { name: 'NOV', 'Tailor Made Tours': 30, 'Group Tours': 20, 'Couple Tours': 35 },
  { name: 'DEC', 'Tailor Made Tours': 18, 'Group Tours': 25, 'Couple Tours': 28 }

];
const ReportChart = () => {

  const [selectedStat, setSelectedStat] = useState('week');
  const dispatch = useDispatch();
  const { reportData } = useSelector((s) => s.statsReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getReport({
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
    <div>
      <div className='grid grid-cols-2 pb-4 gap-4 justify-center items-center'>
        <h1 className='font-bold'>Tour Report</h1>
        <select value={selectedStat} onChange={handleChange} className=''>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={reportData?.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="center"
          />
          <Line type="monotone" dataKey="Tailor Made Tours" stroke="#8884d8" strokeWidth={3} />
          <Line type="monotone" dataKey="Group Tours" stroke="#82ca9d" strokeWidth={3} />
          <Line type="monotone" dataKey="Couple Tours" stroke="#ffc658" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportChart;
