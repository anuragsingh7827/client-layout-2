import React, { useState } from "react";
import Counter from "../widgets/Counter";
import Pictograph from "../widgets/Pictograph";
import config from '../../imgs/config.png';
import SearchPopUp from "./SearchPopUp";
import { nanoid } from 'nanoid';
import styles from '../../css/markup/Sidebar.module.css';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
function Sidebar(props){
    const SidebarComponent = styled.div`
        background-color: ${props.cellData.backgroundColor};
        width: ${props.cellData.width !== "" && props.cellData.width};
        min-height: ${props.cellData.height};
    `;
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const widgets = props.cellData.widgetIds.map((widgetId,index) => {
        const widget = props.widgetsData[widgetId];

        if(widget.type === 'counter'){
            return <Counter key={nanoid()} widget={widget} index={index} />
        }else{
            return <Pictograph key={nanoid()} widget={widget} pictoHeight={props.cellData.height} parent='vertical' index={index}/>
        }
    })

    const droppableId = props.masterContainerId + '/' + props.cellId;
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <SidebarComponent className={styles.sidebar} ref={provided.innerRef} {...provided.droppableProps}>
                    <button onClick={() => setIsPopUpOpen(true)} 
                            className={isPopUpOpen ? `${styles.configBtn} ${styles.configBtnClicked}` : styles.configBtn}>
                            <img className={isPopUpOpen ? `${styles.configIcon} ${styles.configIconClicked}` : styles.configIcon} 
                                src={config} 
                                alt="configIcon"/>
                    </button>
                    <SearchPopUp masterContainer={props.masterContainerId}
                                isPopUpOpen={isPopUpOpen} 
                                cellId={props.cellId} 
                                setCellsConfig={props.setCellsConfig} 
                                setIsPopUpOpen={setIsPopUpOpen}
                    />
                    {widgets}
                    {provided.placeholder}
                </SidebarComponent>
            )}
        </Droppable>
    )
}

export default Sidebar;