import { useState } from 'react'
import styles from "./index.module.css"

const stageData = [
    {title: "Program details"},
    {title: "Application Form"},
    {title: "Workflow"},
    {title: "Preview"},
]

const StageTracker = () => {
    const [stage] = useState("Application Form")
  return (
    <>
    <div className='h-[100px] shadow-bs flex flex-row'>
        {stageData.map((item)=>(
      <div className={stage === item.title ? styles.active : styles.card} key={item.title}>
        {item.title}
      </div>
        ))}
    
    </div>
    </>
  )
}

export default StageTracker