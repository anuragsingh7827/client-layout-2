import React, { useState } from "react";
import { nanoid } from 'nanoid';
import Counter from "../widgets/Counter";
import Pictograph from "../widgets/Pictograph";
import config from '../../imgs/config.png';
import SearchPopUp from "./SearchPopUp";
import styles from '../../css/markup/Center.module.css';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';

function Center(props){
    const CenterComponent = styled.div`
        width: ${props.cellData.width !== "" && props.cellData.width};
        min-height: ${props.cellData.height};
        background-color: ${props.cellData.backgroundColor};
    `;
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const widgets = props.cellData.widgetIds.map((widgetId,index) => {
        const widget = props.widgetsData[widgetId];

        if(widget.type === 'counter'){
            return <Counter key={nanoid()} widget={widget} index={index} />
        }else{
            return <Pictograph key={nanoid()} pictoHeight={props.cellData.height} widget={widget} index={index}/>
        }
    });

    const droppableId = props.masterContainerId + '/' + props.cellId;
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <CenterComponent className={styles.center} ref={provided.innerRef} {...provided.droppableProps}>
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
                </CenterComponent>
            )}
        </Droppable>
    )
}

export default Center;