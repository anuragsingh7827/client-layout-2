import React from "react";
import styles from '../../css/markup/InnerMain.module.css';
import RenderContainer from "../../RenderContainer";

function InnerMain({ cellsConfig, setCellsConfig, widgetsData }){

    return (
        <div className={styles.innerMain}>
            {Object.keys(cellsConfig['innerLeftSidebar']).length > 0 
             && RenderContainer('innerLeftSidebar',cellsConfig,setCellsConfig,widgetsData)}

            {RenderContainer('center',cellsConfig,setCellsConfig,widgetsData)}
            {Object.keys(cellsConfig['innerRightSidebar']).length > 0 
            && RenderContainer('innerRightSidebar',cellsConfig,setCellsConfig,widgetsData)}
        </div>
    )
}

export default InnerMain;