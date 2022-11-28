import React, { useState } from "react";
import Counter from "../widgets/Counter";
import Pictograph from "../widgets/Pictograph";
import { nanoid } from 'nanoid';
import styles from '../../css/markup/InnerSidebar.module.css';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import ContainerLayout from "./ContainerLayout";

function InnerSidebar(props){
    const InnerSidebarComponent = styled.div`
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
                <InnerSidebarComponent className={styles.innerSidebar} ref={provided.innerRef} {...provided.droppableProps}>
                    <ContainerLayout isPopUpOpen={isPopUpOpen}
                                    setIsPopUpOpen={setIsPopUpOpen}
                                    masterContainerId={props.masterContainerId}
                                    cellId={props.cellId}
                                    setCellsConfig={props.setCellsConfig}
                                    widgets={widgets}
                    />
                    {provided.placeholder}
                </InnerSidebarComponent>
            )}
        </Droppable>
    )
}

export default InnerSidebar;