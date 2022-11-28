import React, { useState } from "react";
import { nanoid } from 'nanoid';
import Counter from "../widgets/Counter";
import Pictograph from "../widgets/Pictograph";
import styles from '../../css/markup/Footer.module.css';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import ContainerLayout from "./ContainerLayout";

function Footer(props){
    const FooterComponent = styled.footer`
        min-height: ${props.cellData.height};
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
                <FooterComponent className={styles.footer} ref={provided.innerRef} {...provided.droppableProps}>
                    <ContainerLayout isPopUpOpen={isPopUpOpen}
                                    setIsPopUpOpen={setIsPopUpOpen}
                                    masterContainerId={props.masterContainerId}
                                    cellId={props.cellId}
                                    setCellsConfig={props.setCellsConfig}
                                    widgets={widgets}
                    />
                    {provided.placeholder}
                </FooterComponent>
            )}
        </Droppable>
    )
}

export default Footer;