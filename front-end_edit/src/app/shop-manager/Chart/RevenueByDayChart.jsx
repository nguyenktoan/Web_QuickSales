import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

// Function to format currency in thousands
const formatCurrency = (value) => {
  return `${(value / 1000000).toFixed(0)}M`; // Appending 'K' for thousand units
};

const RevenueByDayChart = ({ currentWeekRevenue, previousWeekRevenue }) => {
  // Verify and log the input data
  console.log("Current Week Revenue: ", currentWeekRevenue);
  console.log("Previous Week Revenue: ", previousWeekRevenue);

  // Transform data into format expected by Recharts
  const transformData = (currentWeek, previousWeek) => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Get the revenue data with default values for empty entries
    const currentWeekData = Object.keys(currentWeek).reduce((acc, date) => {
      const day = format(new Date(date), "EEEE");
      acc[day] = currentWeek[date];
      return acc;
    }, {});

    const previousWeekData = Object.keys(previousWeek).reduce((acc, date) => {
      const day = format(new Date(date), "EEEE");
      acc[day] = previousWeek[date];
      return acc;
    }, {});

    return daysOfWeek.map((day) => ({
      date: day.substring(0, 3),
      currentWeekValue: currentWeekData[day] || 0,
      previousWeekValue: previousWeekData[day] || 0,
    }));
  };

  const mergedData = transformData(currentWeekRevenue, previousWeekRevenue);

  // Log the transformed data to verify correctness
  console.log("Merged Data: ", mergedData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={mergedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickMargin={10} />
        <YAxis tickFormatter={(tick) => formatCurrency(tick)} />
        <Tooltip
          formatter={(value, name) => formatCurrency(value)}
          labelFormatter={(label) => `Day: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="currentWeekValue"
          stroke="#8884d8"
          name="Current Week"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="previousWeekValue"
          stroke="#82ca9d"
          name="Previous Week"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueByDayChart;
