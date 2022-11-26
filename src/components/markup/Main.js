import React from "react";
import InnerContent from "./InnerContent";
import Sidebar from "./Sidebar";
import styles from '../../css/markup/Main.module.css';
import RenderContainer from "../../RenderContainer";

function Main({ cellsConfig, setCellsConfig, widgetsData }){

    return (
        <main className={styles.mainContent}>
            {Object.keys(cellsConfig['leftSidebar']).length > 0 
            && <div className={styles.sidebarsContainer}>
                {RenderContainer('leftSidebar',cellsConfig,setCellsConfig,widgetsData)}
               </div>}
            <InnerContent   cellsConfig={cellsConfig} 
                            setCellsConfig={setCellsConfig} 
                            widgetsData={widgetsData}/>
            {Object.keys(cellsConfig['rightSidebar']).length > 0 
            &&<div className={styles.sidebarsContainer}>
                {RenderContainer('rightSidebar',cellsConfig,setCellsConfig,widgetsData)}
              </div>}
        </main>
    )
}

export default Main;