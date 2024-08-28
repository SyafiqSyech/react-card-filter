import { useEffect, useState } from 'react';
import './App.css'
import Card from './Card'

interface Creature {
  id: number;
  title: string;
  description: string;
  attribute: string[];
}

interface AttributePicker {
  id: number;
  name: string;
}

function App() {
  const [creatures, setCreatures] = useState<Creature[]>([])
  const [attributePicker, setAttributePicker] = useState<AttributePicker[]>([])
  const [filter, setFilter] = useState<string[]>([])

  const handleChange = (attr: string) => {
    if(attr == "0"){
      setFilter([])
      return
    }
    setFilter(prevFilter => {
      if (prevFilter.includes(attr)) {
        return prevFilter.filter(item => item !== attr);
      } else {
        return [...prevFilter, attr];
      }
    });
  };

  useEffect(() => {
    fetch('http://localhost:8000/creatures')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        const filteredData = filter.length > 0
          ? data.filter((creature: Creature) =>
              filter.every(attr => creature.attribute.includes(attr))
            )
          : data;
        setCreatures(filteredData);
      })
    fetch('http://localhost:8000/attributePicker')
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setAttributePicker(data);
      })
  }, [filter])

  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full flex justify-center gap-2'>
        <div
          onClick={() => handleChange("0")}
          className={`px-4 py-1 hover:cursor-pointer ease-in-out duration-200 rounded-full hover:bg-slate-200`}
        >
          Clear All
        </div>
        {attributePicker.map(attr => (
          <div
            key={attr.id}
            onClick={() => handleChange(attr.name)}
            className={`${filter.includes(attr.name) ? 'px-6' : 'px-4'} py-1 hover:cursor-pointer ease-in-out duration-200 rounded-full ${filter.includes(attr.name) ? 'bg-slate-200' : ''} ${filter.includes(attr.name) ? '' : 'text-slate-500'} hover:bg-slate-200`}
          >
            {attr.name}
          </div>
        ))}
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-3 h-3 rounded-full bg-blue-500 relative'>
          <div className='w-3 h-3 rounded-full animate-ping bg-blue-400 -z-10 absolute'></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-4">
        {creatures.length > 0 ? (
          creatures.map((creature, index) => (
            <Card
              key={index}
              title={creature.title}
              content={creature.description}
              attribute={creature.attribute}
              color={undefined}
            />
          ))
        ) : (
          <p className='text-slate-400'>No creatures found matching the selected attributes.</p>
        )}
      </div>
    </div>
  )
}

export default App
