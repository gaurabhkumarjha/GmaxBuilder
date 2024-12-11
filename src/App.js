import './App.css';
import '@mantine/core/styles.css';
import Home from './Pages/Home';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const GetBookedDetails = async () => {
      const res = await fetch('/get/booking-site-details', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      });
      //const Result = await res.json();
      if (res.status === 200) {
        return;
      } else {
        return
      }
    }
    GetBookedDetails()
  }, [])
  return (
    <>
      <Home />
    </>
  );
}

export default App;
