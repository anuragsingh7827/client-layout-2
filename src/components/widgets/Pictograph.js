import React from "react";
import Barchart from "../charts/Barchart";
import Doughnutchart from "../charts/Doughnutchart";
import Piechart from "../charts/Piechart";
import Report from "../charts/Report";
import styles from '../../css/widgets/Pictograph.module.css';
// import styles from './temp.module.css';
import { Draggable } from '@hello-pangea/dnd';
import { nanoid } from 'nanoid';
import styled from 'styled-components';


function Pictograph(props){
    const Pictograph = styled.div`
        height: ${props.pictoHeight};
    `;
    const labels = [];
    const data = [];
    const backgroundColor = [];

    for(let category in props.widget.categoryWiseData){
        labels.push({
            match: {
                id: category
            },
            id: 'dots'
        });
        if(props.widget.numberType === 'total'){
            // data.push(props.widget.categoryWiseData[category].totalDevices);
            data.push({
                id: category,
                value: props.widget.categoryWiseData[category].totalDevices
            })
        }else if(props.widget.numberType === 'active'){
            // data.push(props.widget.categoryWiseData[category].activeDevices);
            data.push({
                id: category,
                value: props.widget.categoryWiseData[category].activeDevices
            })
        }
        backgroundColor.push(props.widget.categoryWiseData[category].color);
    }

    let chart = null;
    if(props.widget.pictographType === 'piechart'){
        // chart = <Piechart   labels={labels}
        //                     data={data}
        //                     backgroundColor={backgroundColor} 
        //             />
        chart = <Piechart data={data} labels={labels} />
    }
    else if(props.widget.pictographType === 'barchart'){
        // chart = <Barchart   labels={labels}
        //                     data={data}
        //                     // backgroundColor={backgroundColor}
        //             />
        const newLabels = labels.map(label => label.match.id);
        const newData = data.map(obj => obj.value);
        chart = <Barchart labels={newLabels} 
                        data={newData} 
                        backgroundColor={backgroundColor}
                />
    }
    else if(props.widget.pictographType === 'doughnutchart'){
        // chart = <Doughnutchart labels={labels}
        //                     data={data}
        //                     // backgroundColor={backgroundColor} 
        //             />
        chart = <Doughnutchart labels={labels} data={data}/>
    }
    else if(props.widget.pictographType === 'report'){
        chart = <Report allDevicesData={props.widget.allDevicesData}/>
    }

    const draggableId = props.widget.id + '/////' + nanoid();
    return (
        // <Draggable draggableId={draggableId} index={props.index}>
        //     {(provided) => (
        //         <div className={styles.widget} 
        //             {...provided.draggableProps} 
        //             {...provided.dragHandleProps} 
        //             ref={provided.innerRef}></div>
        //     )}
        // </Draggable>

        <Draggable draggableId={draggableId} index={props.index}>
            {(provided) => (
                <Pictograph className={styles.pictograph} {...provided.draggableProps} 
                                                {...provided.dragHandleProps} 
                                                ref={provided.innerRef}>
                    <div className={styles.badge}></div>
                    {chart}
                </Pictograph>
            )}
        </Draggable>
    )
}

export default Pictograph;