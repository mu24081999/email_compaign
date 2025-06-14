import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function SchedulePicker({ selectedDate, onDateChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Schedule Campaign</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Date and Time
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

export default SchedulePicker;