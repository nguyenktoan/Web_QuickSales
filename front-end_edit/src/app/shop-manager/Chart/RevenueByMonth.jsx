import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

// Function to format currency in millions
const formatCurrency = (value) => {
  return `${(value / 1000000).toFixed(0)}M`; // Appending 'M' for million units
};

const RevenueByMonthChart = ({ revenueByMonth }) => {
  // Verify and log the input data
  console.log("Revenue By Month: ", revenueByMonth);

  // Transform data into format expected by Recharts
  const transformData = (revenueByMonthData) => {
    const currentYear = new Date().getFullYear(); // Get current year for date parsing

    // Generate array of month labels from January to December
    const months = Array.from(
      { length: 12 },
      (_, i) => format(new Date(currentYear, i), "MMM") // Format month to first three letters (Jan, Feb, etc.)
    );

    // Map through all months and set revenue to 0 if not present in data
    const transformedData = months.map((month) => ({
      month: month,
      value:
        revenueByMonthData[`${currentYear}-${months.indexOf(month) + 1}`] || 0,
    }));

    return transformedData;
  };

  const monthlyData = transformData(revenueByMonth);

  // Log the transformed data to verify correctness
  console.log("Monthly Data: ", monthlyData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickMargin={10} />
        <YAxis tickFormatter={(tick) => formatCurrency(tick)} />
        <Tooltip
          formatter={(value, name) => formatCurrency(value)}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar
          dataKey="value"
          fill="#F2D16B"
          name="Monthly Revenue"
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueByMonthChart;
