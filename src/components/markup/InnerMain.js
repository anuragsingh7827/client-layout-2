import React from "react";
import Center from "./Center";
import InnerSidebar from "./InnerSidebar";
import styles from '../../css/markup/InnerMain.module.css';
import RenderContainer from "../../RenderContainer";

function InnerMain({ cellsConfig, setCellsConfig, widgetsData }){

    return (
        <div className={styles.innerMain}>
            {Object.keys(cellsConfig['innerLeftSidebar']).length > 0 
             &&<div className={styles.innerSidebarsContainer}>
                {RenderContainer('innerLeftSidebar',cellsConfig,setCellsConfig,widgetsData)}
               </div>}
            {RenderContainer('center',cellsConfig,setCellsConfig,widgetsData)}
            {Object.keys(cellsConfig['innerRightSidebar']).length > 0 
            && <div className={styles.innerSidebarsContainer}>
                {RenderContainer('innerRightSidebar',cellsConfig,setCellsConfig,widgetsData)}
               </div>}
        </div>
    )
}

export default InnerMain;