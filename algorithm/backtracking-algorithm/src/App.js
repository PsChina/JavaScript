import React, {useState} from 'react';
import './App.css';

function App() {
  const [size, setSize] = useState(100)
  const [value, setValue] = useState(8)
  const getVDom = (n)=>{
    const column = []
    for (let i = 0; i < n; i++ ) {
      const row = []
      for (let j=0; j < n; j++) {
        row.push(<div style={{float:'left',width:`${size}px`,height:`${size}px`,textAlign:'center',lineHeight:`${size}px`}} key={i*10+j}>({i},{j})</div>)
      }
      column.push(<div style={{clear:'both'}} key={i*10}>{row}</div>)
    }
    return column
  }
  return (
    <div className="App">
      {
        getVDom(value)
      }
    </div>
  );
}

export default App;
