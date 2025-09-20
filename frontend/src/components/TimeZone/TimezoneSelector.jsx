import React, { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';

const ALL_TIMEZONES = [
  { code: 'UTC', name: 'UTC', city: 'Coordinated Universal Time' },
  { code: 'America/New_York', name: 'EST/EDT', city: 'New York' },
  { code: 'America/Los_Angeles', name: 'PST/PDT', city: 'Los Angeles' },
  { code: 'America/Chicago', name: 'CST/CDT', city: 'Chicago' },
  { code: 'America/Denver', name: 'MST/MDT', city: 'Denver' },
  { code: 'America/Phoenix', name: 'MST', city: 'Phoenix' },
  { code: 'America/Anchorage', name: 'AKST/AKDT', city: 'Anchorage' },
  { code: 'America/Honolulu', name: 'HST', city: 'Honolulu' },
  { code: 'America/Toronto', name: 'EST/EDT', city: 'Toronto' },
  { code: 'America/Vancouver', name: 'PST/PDT', city: 'Vancouver' },
  { code: 'America/Mexico_City', name: 'CST/CDT', city: 'Mexico City' },
  { code: 'America/Sao_Paulo', name: 'BRT', city: 'São Paulo' },
  { code: 'America/Buenos_Aires', name: 'ART', city: 'Buenos Aires' },
  { code: 'Europe/London', name: 'GMT/BST', city: 'London' },
  { code: 'Europe/Paris', name: 'CET/CEST', city: 'Paris' },
  { code: 'Europe/Berlin', name: 'CET/CEST', city: 'Berlin' },
  { code: 'Europe/Rome', name: 'CET/CEST', city: 'Rome' },
  { code: 'Europe/Madrid', name: 'CET/CEST', city: 'Madrid' },
  { code: 'Europe/Amsterdam', name: 'CET/CEST', city: 'Amsterdam' },
  { code: 'Europe/Zurich', name: 'CET/CEST', city: 'Zurich' },
  { code: 'Europe/Vienna', name: 'CET/CEST', city: 'Vienna' },
  { code: 'Europe/Prague', name: 'CET/CEST', city: 'Prague' },
  { code: 'Europe/Warsaw', name: 'CET/CEST', city: 'Warsaw' },
  { code: 'Europe/Stockholm', name: 'CET/CEST', city: 'Stockholm' },
  { code: 'Europe/Oslo', name: 'CET/CEST', city: 'Oslo' },
  { code: 'Europe/Copenhagen', name: 'CET/CEST', city: 'Copenhagen' },
  { code: 'Europe/Helsinki', name: 'EET/EEST', city: 'Helsinki' },
  { code: 'Europe/Athens', name: 'EET/EEST', city: 'Athens' },
  { code: 'Europe/Istanbul', name: 'TRT', city: 'Istanbul' },
  { code: 'Europe/Moscow', name: 'MSK', city: 'Moscow' },
  { code: 'Africa/Cairo', name: 'EET', city: 'Cairo' },
  { code: 'Africa/Johannesburg', name: 'SAST', city: 'Johannesburg' },
  { code: 'Africa/Lagos', name: 'WAT', city: 'Lagos' },
  { code: 'Africa/Nairobi', name: 'EAT', city: 'Nairobi' },
  { code: 'Asia/Dubai', name: 'GST', city: 'Dubai' },
  { code: 'Asia/Kolkata', name: 'IST', city: 'Mumbai' },
  { code: 'Asia/Karachi', name: 'PKT', city: 'Karachi' },
  { code: 'Asia/Dhaka', name: 'BST', city: 'Dhaka' },
  { code: 'Asia/Bangkok', name: 'ICT', city: 'Bangkok' },
  { code: 'Asia/Ho_Chi_Minh', name: 'ICT', city: 'Ho Chi Minh City' },
  { code: 'Asia/Jakarta', name: 'WIB', city: 'Jakarta' },
  { code: 'Asia/Singapore', name: 'SGT', city: 'Singapore' },
  { code: 'Asia/Kuala_Lumpur', name: 'MYT', city: 'Kuala Lumpur' },
  { code: 'Asia/Manila', name: 'PHT', city: 'Manila' },
  { code: 'Asia/Shanghai', name: 'CST', city: 'Shanghai' },
  { code: 'Asia/Beijing', name: 'CST', city: 'Beijing' },
  { code: 'Asia/Hong_Kong', name: 'HKT', city: 'Hong Kong' },
  { code: 'Asia/Taipei', name: 'CST', city: 'Taipei' },
  { code: 'Asia/Seoul', name: 'KST', city: 'Seoul' },
  { code: 'Asia/Tokyo', name: 'JST', city: 'Tokyo' },
  { code: 'Australia/Sydney', name: 'AEDT/AEST', city: 'Sydney' },
  { code: 'Australia/Melbourne', name: 'AEDT/AEST', city: 'Melbourne' },
  { code: 'Australia/Perth', name: 'AWST', city: 'Perth' },
  { code: 'Australia/Brisbane', name: 'AEST', city: 'Brisbane' },
  { code: 'Australia/Adelaide', name: 'ACDT/ACST', city: 'Adelaide' },
  { code: 'Pacific/Auckland', name: 'NZDT/NZST', city: 'Auckland' },
  { code: 'Pacific/Fiji', name: 'FJT', city: 'Suva' },
  { code: 'Pacific/Honolulu', name: 'HST', city: 'Honolulu' },
];

const TimezoneSelector = ({ onSelect, isDarkMode, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTimezones = ALL_TIMEZONES.filter(tz =>
    tz.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tz.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
        : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Add Timezone
        </h2>
        <button
          onClick={onClose}
          className={`p-2 rounded-full transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative mb-6">
        <Search className={`absolute left-3 top-3 w-5 h-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          placeholder="Search timezones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full p-3 pl-10 rounded-lg border transition-colors ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredTimezones.map(timezone => (
          <button
            key={timezone.code}
            onClick={() => onSelect(timezone)}
            className={`w-full p-3 rounded-lg text-left transition-colors hover:scale-[1.02] transform ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-white' 
                : 'hover:bg-gray-50 text-gray-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{timezone.name}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {timezone.city}
                  </span>
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {timezone.code}
                </div>
              </div>
              <Plus className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimezoneSelector;
