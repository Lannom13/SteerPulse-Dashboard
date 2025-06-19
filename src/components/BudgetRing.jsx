// src/components/BudgetRing.jsx
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetRing({ percentage, label }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-24 h-24">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: '#ffffff',
            pathColor: '#0EA5E9',
            trailColor: '#374151',
          })}
        />
      </div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  )
}
