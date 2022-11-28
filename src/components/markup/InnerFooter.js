import React, { useState } from "react";
import Counter from "../widgets/Counter";
import Pictograph from "../widgets/Pictograph";
import { nanoid } from 'nanoid';
import styles from '../../css/markup/InnerFooter.module.css';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import ContainerLayout from "./ContainerLayout";


function InnerFooter(props){
    const InnerFooterComponent = styled.footer`
        min-height: ${props.cellData.height};
        width: ${props.cellData.width};
        background-color: ${props.cellData.backgroundColor};
    `;
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const widgets = props.cellData.widgetIds.map((widgetId,index) => {
        const widget = props.widgetsData[widgetId];

        if(widget.type === 'counter'){
            return <Counter key={nanoid()} widget={widget} index={index} />
        }else{
            return <Pictograph key={nanoid()} widget={widget} pictoHeight={props.cellData.height} parent='horizontal' index={index}/>
        }
    })

    const droppableId = props.masterContainerId + '/' + props.cellId;
    return (
        <Droppable droppableId={droppableId} direction="horizontal">
            {(provided) => (
                <InnerFooterComponent className={styles.innerFooter} ref={provided.innerRef} {...provided.droppableProps}>
                    <ContainerLayout isPopUpOpen={isPopUpOpen}
                                    setIsPopUpOpen={setIsPopUpOpen}
                                    masterContainerId={props.masterContainerId}
                                    cellId={props.cellId}
                                    setCellsConfig={props.setCellsConfig}
                                    widgets={widgets}
                    />
                    {provided.placeholder}
                </InnerFooterComponent>
            )}
        </Droppable>
    )
}

export default InnerFooter;