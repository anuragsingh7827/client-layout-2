import Center from "./components/markup/Center";
import Footer from "./components/markup/Footer";
import Header from "./components/markup/Header";
import InnerFooter from "./components/markup/InnerFooter";
import InnerHeader from "./components/markup/InnerHeader";
import InnerSidebar from "./components/markup/InnerSidebar";
import Sidebar from "./components/markup/Sidebar";

export default function RenderContainer(masterContainerId, cellsConfig, setCellsConfig, widgetsData){
    const allContainers = [];
    const containers = cellsConfig[masterContainerId];

    for(let container in containers){
        switch(masterContainerId){
            case 'header':
                allContainers.push(<Header key={containers[container].cellId}
                                            masterContainerId={masterContainerId}
                                            cellId={containers[container].cellId} 
                                            cellData={containers[container]} 
                                            setCellsConfig={setCellsConfig} 
                                            widgetsData={widgetsData}/>) 
                break;

            case 'footer':
                allContainers.push(<Footer key={containers[container].cellId} 
                                            masterContainerId={masterContainerId}
                                            cellId={containers[container].cellId} 
                                            cellData={containers[container]} 
                                            setCellsConfig={setCellsConfig} 
                                            widgetsData={widgetsData}/>) 
                break;

            case 'leftSidebar':
                allContainers.push(<Sidebar key={containers[container].cellId} 
                                            masterContainerId={masterContainerId}
                                            cellId={containers[container].cellId} 
                                            cellData={containers[container]} 
                                            setCellsConfig={setCellsConfig} 
                                            widgetsData={widgetsData}/>) 
                break;

            case 'rightSidebar':
                allContainers.push(<Sidebar key={containers[container].cellId} 
                                            masterContainerId={masterContainerId}
                                            cellId={containers[container].cellId} 
                                            cellData={containers[container]} 
                                            setCellsConfig={setCellsConfig} 
                                            widgetsData={widgetsData}/>) 
                break;

            case 'innerHeader':
                allContainers.push(<InnerHeader key={containers[container].cellId} 
                                                masterContainerId={masterContainerId}
                                                cellId={containers[container].cellId} 
                                                cellData={containers[container]} 
                                                setCellsConfig={setCellsConfig} 
                                                widgetsData={widgetsData}/>) 
                break;
            
            case 'innerFooter':
                allContainers.push(<InnerFooter key={containers[container].cellId} 
                                                masterContainerId={masterContainerId}
                                                cellId={containers[container].cellId} 
                                                cellData={containers[container]} 
                                                setCellsConfig={setCellsConfig} 
                                                widgetsData={widgetsData}/>) 
                break;
            
            case 'innerLeftSidebar':
                allContainers.push(<InnerSidebar key={containers[container].cellId}
                                                masterContainerId={masterContainerId}
                                                cellId={containers[container].cellId} 
                                                cellData={containers[container]} 
                                                setCellsConfig={setCellsConfig} 
                                                widgetsData={widgetsData}/>) 
                break;

            case 'innerRightSidebar':
                allContainers.push(<InnerSidebar key={containers[container].cellId} 
                                                masterContainerId={masterContainerId}
                                                cellId={containers[container].cellId} 
                                                cellData={containers[container]} 
                                                setCellsConfig={setCellsConfig} 
                                                widgetsData={widgetsData}/>) 

                break;
                    
            case 'center':
                allContainers.push(<Center key={containers[container].cellId} 
                                        masterContainerId={masterContainerId}
                                        cellId={containers[container].cellId} 
                                        cellData={containers[container]} 
                                        setCellsConfig={setCellsConfig} 
                                        widgetsData={widgetsData}/>)
                break;
        }
    }

    return allContainers;
}