import React from "react";
import styles from '../../css/markup/ContainerLayout.module.css';
import config from '../../imgs/config.png';
import SearchPopUp from "./SearchPopUp";

function ContainerLayout(props){
    return (
        <>
            <button onClick={() => props.setIsPopUpOpen(true)} 
                    className={props.isPopUpOpen ? `${styles.configBtn} ${styles.configBtnClicked}` : styles.configBtn}>
                    <img className={props.isPopUpOpen ? `${styles.configIcon} ${styles.configIconClicked}` : styles.configIcon} 
                        src={config} 
                        alt="configIcon"/>
            </button>
            <SearchPopUp masterContainerId={props.masterContainerId}
                        isPopUpOpen={props.isPopUpOpen} 
                        cellId={props.cellId} 
                        setCellsConfig={props.setCellsConfig} 
                        setIsPopUpOpen={props.setIsPopUpOpen}
            />
            {props.widgets}
        </>
    )
}

export default ContainerLayout;