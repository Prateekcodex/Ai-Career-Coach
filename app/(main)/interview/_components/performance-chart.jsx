"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  // Dummy data for testing
  // const chartData = [
  //   { date: "Jul 07", score: 50 },
  //   { date: "Jul 08", score: 70 },
  //   { date: "Jul 09", score: 30 },
  //   { date: "Jul 10", score: 90 },
  // ];
  // console.log("Chart Data:", chartData);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments && Array.isArray(assessments) && assessments.length > 0) {
      try {
        const formattedData = assessments
          .filter(assessment => assessment.createdAt) // Filter out invalid dates
          .map((assessment) => {
            const date = new Date(assessment.createdAt);
            // Check if date is valid
            if (isNaN(date.getTime())) {
              console.warn("Invalid date:", assessment.createdAt);
              return null;
            }
            return {
              date: format(date, "MMM dd"),
              score: typeof assessment.quizScore === "number" ? assessment.quizScore : 0,
            };
          })
          .filter(Boolean); // Remove null entries
        
        setChartData(formattedData);
        console.log("Chart Data:", formattedData);
      } catch (error) {
        console.error("Error formatting chart data:", error);
        setChartData([]);
      }
    } else {
      setChartData([]);
    }
  }, [assessments]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          Performance Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#ffffff"
                strokeWidth={2}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}