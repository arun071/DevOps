import React from 'react';
import { Clock, X } from 'lucide-react';

const TimezoneClock = ({ 
  timezone, 
  currentTime, 
  isDarkMode, 
  onRemove, 
  canRemove 
}) => {
  const getTimeInTimezone = (date, timezoneCode) => {
    return new Date(date.toLocaleString("en-US", { timeZone: timezoneCode }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeOffset = (timezoneCode) => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const targetTime = new Date(utc + getTimezoneOffset(timezoneCode) * 1000);
    const offset = (targetTime.getTime() - utc) / (1000 * 60 * 60);
    return offset >= 0 ? `+${offset}` : offset.toString();
  };

  const getTimezoneOffset = (timezoneCode) => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const targetTime = new Date(date.toLocaleString("en-US", { timeZone: timezoneCode }));
    return (targetTime.getTime() - utc) / 1000;
  };

  const timezoneTime = getTimeInTimezone(currentTime, timezone.code);
  const time = formatTime(timezoneTime);
  const date = formatDate(timezoneTime);
  const isEvening = timezoneTime.getHours() >= 18 || timezoneTime.getHours() <= 6;

  return (
    <div className={`relative group rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 ${
      isDarkMode 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/70' 
        : 'bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 shadow-lg hover:shadow-xl'
    }`}>
      {canRemove && (
        <button
          onClick={() => onRemove(timezone.code)}
          className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full ${
            isDarkMode 
              ? 'hover:bg-red-500/20 text-red-400 hover:text-red-300' 
              : 'hover:bg-red-500/10 text-red-500 hover:text-red-600'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${
          isEvening 
            ? isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/10 text-purple-600'
            : isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-500/10 text-yellow-600'
        }`}>
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {timezone.name}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {timezone.city}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className={`text-3xl font-bold font-mono ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {time}
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {date}
        </div>
      </div>

      <div className={`mt-4 pt-4 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex justify-between items-center">
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {timezone.code}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            UTC{getTimeOffset(timezone.code)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimezoneClock;
