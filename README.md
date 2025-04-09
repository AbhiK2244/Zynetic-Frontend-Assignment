# 🌦️ Weather Dashboard Web App

##  Features

- Search weather by city name
-  Live temperature, humidity, wind speed, and conditions
- 5-day / 3-hour forecast display
-  Dark and Light mode toggle
-  Stores last 5 searched cities in history
-  API error and loading state handling

---

## 🛠️ Tech Stack

| Technology      |        Purpose                   |
|-----------------|-----------------------------------|
| React.js        | UI library for building the frontend |
| Tailwind CSS    | Utility-first CSS framework       |
| Axios           | For making HTTP API requests      |
| React Hot Toast | For showing user-friendly toasts  |
| OpenWeatherMap API | For fetching weather data       |
| LocalStorage    | For persisting search history and theme mode |

---

## Setup Instructions
- Cone the repo
```
git clone https://github.com/AbhiK2244/Zynetic-Frontend-Assignment.git 
 ```
- Navigate to root directory
- Install the dependencies
```
npm install
```
- Create the .env file and add
```
VITE_API_KEY=YOUR_API_KEY
```
- Run the project
```
npm run dev
```

## API integration Details
- 1000 rate limit per day
- My Api key = 6073b417d5c87c0930cc271d404330a3
- Api used:
```
for real-time data:
https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric

for 5 days/ 3hrs forecast data:
https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric
```

## Project Live at
```
https://zynetic-frontend-assignment.vercel.app/
```