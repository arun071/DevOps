import React, { useState } from 'react';
import { ArrowRightLeft, Calendar, Clock } from 'lucide-react';

const COMMON_TIMEZONES = [
  { code: 'UTC', name: 'UTC', city: 'Coordinated Universal Time' },
  { code: 'America/New_York', name: 'EST/EDT', city: 'New York' },
  { code: 'America/Los_Angeles', name: 'PST/PDT', city: 'Los Angeles' },
  { code: 'America/Chicago', name: 'CST/CDT', city: 'Chicago' },
  { code: 'Europe/London', name: 'GMT/BST', city: 'London' },
  { code: 'Europe/Paris', name: 'CET/CEST', city: 'Paris' },
  { code: 'Asia/Kolkata', name: 'IST', city: 'Mumbai' },
  { code: 'Asia/Tokyo', name: 'JST', city: 'Tokyo' },
  { code: 'Asia/Shanghai', name: 'CST', city: 'Shanghai' },
  { code: 'Australia/Sydney', name: 'AEDT/AEST', city: 'Sydney' },
];

const TimezoneConverter = ({ currentTime, isDarkMode }) => {
  const [fromTimezone, setFromTimezone] = useState('UTC');
  const [toTimezone, setToTimezone] = useState('America/New_York');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(new Date().toTimeString().slice(0, 5));

  const convertTime = () => {
    const dateTimeString = `${selectedDate}T${selectedTime}:00`;
    const inputDate = new Date(dateTimeString);
    const fromDate = new Date(inputDate.toLocaleString("en-US", { timeZone: fromTimezone }));
    const utcDate = new Date(inputDate.getTime() + inputDate.getTimezoneOffset() * 60000);
    const toDate = new Date(utcDate.toLocaleString("en-US", { timeZone: toTimezone }));

    return {
      from: inputDate.toLocaleString('en-US', { 
        timeZone: fromTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }),
      to: inputDate.toLocaleString('en-US', { 
        timeZone: toTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
    };
  };

  const convertedTime = convertTime();

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
        : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-full ${
          isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
        }`}>
          <ArrowRightLeft className="w-5 h-5" />
        </div>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Timezone Converter
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              From Timezone
            </label>
            <select
              value={fromTimezone}
              onChange={(e) => setFromTimezone(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              {COMMON_TIMEZONES.map(tz => (
                <option key={tz.code} value={tz.code}>
                  {tz.name} - {tz.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Date
            </label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-3 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Time
            </label>
            <div className="relative">
              <Clock className={`absolute left-3 top-3 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              To Timezone
            </label>
            <select
              value={toTimezone}
              onChange={(e) => setToTimezone(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              {COMMON_TIMEZONES.map(tz => (
                <option key={tz.code} value={tz.code}>
                  {tz.name} - {tz.city}
                </option>
              ))}
            </select>
          </div>

          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h3 className={`text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Converted Time
            </h3>
            <div className="space-y-2">
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                From: {convertedTime.from}
              </div>
              <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                To: {convertedTime.to}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimezoneConverter;
