import React, { useState, useEffect } from 'react';
import { Clock, Globe, ArrowRightLeft, Settings, Moon, Sun } from 'lucide-react';
import TimezoneConverter from './TimezoneConverter';
import TimezoneClock from './TimezoneClock';
import TimezoneSelector from './TimezoneSelector';

const DEFAULT_TIMEZONES = [
  { code: 'UTC', name: 'UTC', city: 'Coordinated Universal Time' },
  { code: 'America/New_York', name: 'EST', city: 'New York' },
  { code: 'America/Los_Angeles', name: 'PST', city: 'Los Angeles' },
  { code: 'Europe/London', name: 'GMT', city: 'London' },
  { code: 'Asia/Kolkata', name: 'IST', city: 'Mumbai' },
  { code: 'Asia/Tokyo', name: 'JST', city: 'Tokyo' }
];

function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState(DEFAULT_TIMEZONES);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showConverter, setShowConverter] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimezone = (timezone) => {
    if (!selectedTimezones.find(tz => tz.code === timezone.code)) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
    setShowSelector(false);
  };

  const removeTimezone = (code) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.code !== code));
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              WorldClock
            </h1>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Track time across multiple timezones with precision
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowConverter(!showConverter)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
              showConverter
                ? isDarkMode 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-blue-600 text-white shadow-lg'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <ArrowRightLeft className="w-5 h-5 inline mr-2" />
            Converter
          </button>
          <button
            onClick={() => setShowSelector(!showSelector)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            <Settings className="w-5 h-5 inline mr-2" />
            Add Timezone
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Timezone Selector */}
        {showSelector && (
          <div className="mb-8">
            <TimezoneSelector 
              onSelect={addTimezone} 
              isDarkMode={isDarkMode}
              onClose={() => setShowSelector(false)}
            />
          </div>
        )}

        {/* Timezone Converter */}
        {showConverter && (
          <div className="mb-8">
            <TimezoneConverter 
              currentTime={currentTime} 
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTimezones.map((timezone) => (
            <TimezoneClock
              key={timezone.code}
              timezone={timezone}
              currentTime={currentTime}
              isDarkMode={isDarkMode}
              onRemove={removeTimezone}
              canRemove={selectedTimezones.length > 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Time;
