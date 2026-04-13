import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react';

const CustomDatePicker = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-semibold text-slate-700 ml-1">
        Date of Birth
      </label>
      
      <div className="relative group">
        {/* Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-20 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <Calendar size={18} />
        </div>

        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select your date"
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl
                     text-sm font-medium text-slate-700 outline-none transition-all
                     hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          calendarClassName="custom-calendar"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          maxDate={new Date()}
        />
      </div>

      {/* Custom CSS */}
      <style>{`
        .react-datepicker-wrapper { width: 100%; }

        .custom-calendar {
          border-radius: 16px !important;
          border: none !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
          padding: 12px !important;
          font-family: inherit !important;
        }

        .react-datepicker__header {
          background-color: #f9fafb !important;
          border-bottom: 1px solid #e5e7eb !important;
          padding-top: 16px !important;
        }

        .react-datepicker__current-month {
          font-weight: 600 !important;
          color: #111827 !important;
        }

        .react-datepicker__day--selected {
          background-color: #6366f1 !important;
          color: white !important;
          border-radius: 8px !important;
        }

        .react-datepicker__day:hover {
          background-color: #e0e7ff !important;
          border-radius: 8px !important;
        }

        .react-datepicker__year-dropdown,
        .react-datepicker__month-dropdown {
          max-height: 180px;
          overflow-y: auto;
          padding: 4px 0;
        }

        .react-datepicker__triangle {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomDatePicker;