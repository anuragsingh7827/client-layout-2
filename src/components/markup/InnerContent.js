import React from "react";
import InnerMain from "./InnerMain";
import RenderContainer from "../../RenderContainer";

function InnerContent({ cellsConfig, setCellsConfig, widgetsData }){

    return (
        <div>
            {Object.keys(cellsConfig['innerHeader']).length > 0 
            &&<div>{RenderContainer('innerHeader',cellsConfig,setCellsConfig,widgetsData)}</div>}
            <InnerMain  cellsConfig={cellsConfig} 
                        setCellsConfig={setCellsConfig} 
                        widgetsData={widgetsData} />
            {Object.keys(cellsConfig['innerFooter']).length > 0 
            && <div>{RenderContainer('innerFooter',cellsConfig,setCellsConfig,widgetsData)}</div>}
        </div>
    )
}

export default InnerContent;