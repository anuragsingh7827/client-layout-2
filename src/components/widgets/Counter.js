import React from "react";
import styles from '../../css/widgets/Counter.module.css';
// import styles from './temp.module.css';
import { Draggable } from '@hello-pangea/dnd';
import { nanoid } from 'nanoid';


function Counter(props){
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
                <div className={styles.counter}
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps} 
                    ref={provided.innerRef}>
                    <h3 className={styles.title}>
                        {props.widget.numberType.toUpperCase()} DEVICES
                    </h3>
                    <h2 className={styles.count}>{props.widget.count}</h2>
                </div>

            )}
        </Draggable>
    )
}

export default Counter;