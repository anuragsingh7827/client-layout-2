import React from "react";
import InnerContent from "./InnerContent";
import styles from '../../css/markup/Main.module.css';
import RenderContainer from "../../RenderContainer";

function Main({ cellsConfig, setCellsConfig, widgetsData }){

    return (
        <main className={styles.mainContent}>
            {Object.keys(cellsConfig['leftSidebar']).length > 0 
            && RenderContainer('leftSidebar',cellsConfig,setCellsConfig,widgetsData)}

            <InnerContent cellsConfig={cellsConfig} 
                    setCellsConfig={setCellsConfig} 
                    widgetsData={widgetsData}/>

            {Object.keys(cellsConfig['rightSidebar']).length > 0 
            && RenderContainer('rightSidebar',cellsConfig,setCellsConfig,widgetsData)}
        </main>
    )
}

export default Main;