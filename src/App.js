import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cells from "./Cells";

function App(props){
  const [isLoading,setIsLoading] = useState(true);

  const [computedData, setComputedData] = useState({});

  useEffect(() => {
      async function fetchData(){
          const response = await axios.get('https://telemetry.coraltele.com/app/v2/asset/list');
          
          setIsLoading(false);
          const allDevicesData = response.data.data;
          
          const categoryWiseData = {};

          for(let i = 0; i < allDevicesData.length; i++){
              const category = allDevicesData[i].category;

              if(categoryWiseData[category]){
                  categoryWiseData[category].totalDevices++;
                  if(allDevicesData[i].status) categoryWiseData[category].activeDevices++;
              }
              else{
                  categoryWiseData[category] = {};

                  categoryWiseData[category].totalDevices = 1;
                  if(allDevicesData[i].status) categoryWiseData[category].activeDevices = 1;

                  const red = Math.floor(Math.random() * 256);
                  const green = Math.floor(Math.random() * 256);
                  const blue = Math.floor(Math.random() * 256);

                  categoryWiseData[category].color = `rgba(${red},${green},${blue},1)`;
              }
          }

          setComputedData({
              totalDevices: allDevicesData.length,
              activeDevices: allDevicesData.reduce((prev,curr) => prev + curr.status, 0)
                              .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              allDevicesData: allDevicesData,
              categoryWiseData: categoryWiseData
          })       
      }
      
      fetchData();
  },[]);

  // console.log(props.fileData);
  return (
    <>
      {isLoading ? <p>Loading...</p> : <Cells computedData={computedData} 
                                              fileData={props.fileData}/>}
    </>
  )
}

export default App;