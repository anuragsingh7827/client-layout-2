import React, { useState } from "react";
import { nanoid } from 'nanoid';
import Counter from "../widgets/Counter";
import Pictograph from "../widgets/Pictograph";
import config from '../../imgs/config.png';
import SearchPopUp from "./SearchPopUp";
import styles from '../../css/markup/Header.module.css';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
// import { Resizable } from 're-resizable';

function Header(props){
    const HeaderComponent = styled.header`
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
        // <Resizable>
            <Droppable droppableId={droppableId} direction="horizontal">
                {(provided) => (

                        <HeaderComponent className={styles.header} ref={provided.innerRef} {...provided.droppableProps}>
                            <button onClick={() => setIsPopUpOpen(true)} 
                                    className={isPopUpOpen ? `${styles.configBtn} ${styles.configBtnClicked}` : styles.configBtn}>
                                    <img className={isPopUpOpen ? `${styles.configIcon} ${styles.configIconClicked}` : styles.configIcon} 
                                        src={config} 
                                        alt="configIcon"/>
                            </button>
                            <SearchPopUp isPopUpOpen={isPopUpOpen} 
                                        masterContainer={props.masterContainerId}
                                        cellId={props.cellId} 
                                        setCellsConfig={props.setCellsConfig} 
                                        setIsPopUpOpen={setIsPopUpOpen}
                            />
                            {widgets}
                            {provided.placeholder}
                        </HeaderComponent>

                )}
            </Droppable>
        // </Resizable>
    )
}

export default Header;