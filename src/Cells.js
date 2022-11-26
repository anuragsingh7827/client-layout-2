import React, { useState } from "react";
import cellsData from "./CellsData";
import Main from "./components/markup/Main";
import { DragDropContext } from '@hello-pangea/dnd';
import RenderContainer from "./RenderContainer";

function Cells(props){
    const [cellsConfig, setCellsConfig] = useState(props.fileData);

    const widgetsData = {
        'Total devices counter': {
            id: 'Total devices counter',
            type: 'counter',
            numberType: 'total',
            count: props.computedData.totalDevices,
            pictographType: '',
            categoryWiseData: {},
            allDevicesData: []
        },
        'Active devices counter': {
            id: 'Active devices counter',
            type: 'counter',
            numberType: 'active',
            count: props.computedData.activeDevices,
            pictographType: '',
            categoryWiseData: {},
            allDevicesData: []
        },
        'Total devices piechart': {
            id: 'Total devices piechart',
            type: 'pictograph',
            numberType: 'total',
            count: 0,
            pictographType: 'piechart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Active devices piechart': {
            id: 'Active devices piechart',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'piechart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Total devices doughnutchart': {
            id: 'Total devices doughnutchart',
            type: 'pictograph',
            numberType: 'total',
            count: 0,
            pictographType: 'doughnutchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Active devices doughnutchart': {
            id: 'Active devices doughnutchart',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'doughnutchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Total devices barchart': {
            id: 'Total devices barchart',
            type: 'pictograph',
            numberType: 'total',
            count: 0,
            pictographType: 'barchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Active devices barchart': {
            id: 'Active devices barchart',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'barchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Report': {
            id: 'Report',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'report',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        }
    }

    function handleOnDrag(result){
        const { destination, source, draggableId } = result;

        const sourceMasterContainerId = source.droppableId.split('/')[0];
        const sourceChildContainerId = source.droppableId.split('/')[1];
        const destinationMasterContainerId = destination.droppableId.split('/')[0];
        const destinationChildContainerId = destination.droppableId.split('/')[1];

        const draggedWidgetId = draggableId.split('/////')[0];
        
        if(!destination) return;
        
        else if(destination.droppableId === source.droppableId 
            && destination.index === source.index) return;
        
        else{
            const sourceMasterContainer = cellsConfig[sourceMasterContainerId]
            const sourceChildContainer = sourceMasterContainer[sourceChildContainerId];
            const destinationMasterContainer = cellsConfig[destinationMasterContainerId];
            const destinationChildContainer = destinationMasterContainer[destinationChildContainerId];

            const newSourceChildContainerWidgetIds = [...sourceChildContainer.widgetIds];
            newSourceChildContainerWidgetIds.splice(source.index,1);
   
            if(source.droppableId === destination.droppableId){
              newSourceChildContainerWidgetIds.splice(destination.index,0,draggedWidgetId);

              setCellsConfig(prevCellsConfig => {
                return {
                  ...prevCellsConfig,
                  [sourceMasterContainerId]: {
                    ...sourceMasterContainer,
                    [sourceChildContainerId]: {
                      ...sourceChildContainer,
                      widgetIds: newSourceChildContainerWidgetIds
                    }
                  }
                }
              });

            }
            else if(sourceMasterContainerId === destinationMasterContainerId
              && sourceChildContainerId !== destinationChildContainerId){
                const newDestinationChildContainerWidgetIds = [...destinationChildContainer.widgetIds];
      
                newDestinationChildContainerWidgetIds.splice(destination.index,0,draggedWidgetId);

                setCellsConfig(prevCellsConfig => {
                  return {
                    ...prevCellsConfig,
                    [sourceMasterContainerId]: {
                      ...sourceMasterContainer,
                      [sourceChildContainerId]: {
                        ...sourceChildContainer,
                        widgetIds: newSourceChildContainerWidgetIds
                      },
                      [destinationChildContainerId]: {
                        ...destinationChildContainer,
                        widgetIds: newDestinationChildContainerWidgetIds
                      }
                    }
                  }
                })
            }
            else{
              const newDestinationChildContainerWidgetIds = [...destinationChildContainer.widgetIds];
      
              newDestinationChildContainerWidgetIds.splice(destination.index,0,draggedWidgetId);

              setCellsConfig(prevCellsConfig => {
                return {
                  ...prevCellsConfig,
                  [sourceMasterContainerId]: {
                    ...sourceMasterContainer,
                    [sourceChildContainerId]: {
                      ...sourceChildContainer,
                      widgetIds: newSourceChildContainerWidgetIds
                    }
                  },
                  [destinationMasterContainerId]: {
                    ...destinationMasterContainer,
                    [destinationChildContainerId]: {
                      ...destinationChildContainer,
                      widgetIds: newDestinationChildContainerWidgetIds
                    }
                  }
                }
              });
      
            }
        } 
    }

    return (
        <DragDropContext onDragEnd={handleOnDrag}>
            {Object.keys(cellsConfig['header']).length > 0
              && <div>{RenderContainer('header',cellsConfig,setCellsConfig,widgetsData)}</div>}
              <Main cellsConfig={cellsConfig} 
                    setCellsConfig={setCellsConfig} 
                    widgetsData={widgetsData}/>
              {Object.keys(cellsConfig['footer']).length > 0 
              && <div>{RenderContainer('footer',cellsConfig,setCellsConfig,widgetsData)}</div>}
        </DragDropContext>
    )
}

export default Cells;