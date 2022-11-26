import React, { useState } from "react";
import CreatableSelect from 'react-select';
import styles from '../../css/markup/SearchPopUp.module.css';

function SearchPopUp(props){
    const [availableOptions, setAvailableOptions] = useState([
        {
            value: 'Total devices counter',
            label: 'Total devices counter'
        },
        {
            value: 'Active devices counter',
            label: 'Active devices counter'
        },
        {
            value: 'Total devices piechart',
            label: 'Total devices piechart'
        },
        {
            value: 'Active devices piechart',
            label: 'Active devices piechart'
        },
        {
            value: 'Total devices doughnutchart',
            label: 'Total devices doughnutchart'
        },
        {
            value: 'Active devices doughnutchart',
            label: 'Active devices doughnutchart'
        },
        {
            value: 'Total devices barchart',
            label: 'Total devices barchart'
        },
        {
            value: 'Active devices barchart',
            label: 'Active devices barchart'
        },
        {
            value: 'Report',
            label: 'Report'
        }
    ]);
    const [chosenOptions,setChosenOptions] = useState([]);

    
    function addWidgetsHandle(){
        setAvailableOptions(prevAvailableOptions => {
            const removeOptions = new Set(chosenOptions);
            return prevAvailableOptions.filter(option => !removeOptions.has(option))
        });
        props.setCellsConfig(prevCellsConfig => {
            const masterContainerInfo = prevCellsConfig[props.masterContainer];
            const childContainerInfo = masterContainerInfo[props.cellId];

            const oldWidgetIds = childContainerInfo.widgetIds;
            const newWidgetIds = oldWidgetIds.concat(chosenOptions.map(option => option.value));
            return {
                ...prevCellsConfig,
                [props.masterContainer]:{
                    ...masterContainerInfo,
                    [props.cellId]: {
                        ...childContainerInfo,
                        widgetIds: newWidgetIds
                    }
                }
            }
        });
        props.setIsPopUpOpen(false);
    }
    
    function optionsChangeHandle(selectedOptions){
        setChosenOptions(selectedOptions);
    }

    return (
        props.isPopUpOpen &&    <>
                                    <div className={styles.overlay}></div>
                                    <div className={styles.popUp}>
                                        <CreatableSelect options={availableOptions} 
                                                onChange={optionsChangeHandle} 
                                                isMulti />
                                        <div className={styles.buttonGroup}>
                                            <button onClick={addWidgetsHandle}
                                                    className={styles.addWidgetsBtn}>
                                                Add Widgets
                                            </button>
                                            <button onClick={() => props.setIsPopUpOpen(false)}
                                                    className={styles.closePopUpBtn}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </>
    )
}

export default SearchPopUp;