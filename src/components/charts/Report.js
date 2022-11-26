import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Report(props) {
    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1, width: 'auto'  },
        { field: 'nodeId', headerName: 'ID', flex: 1, width: 'auto'  },
        { field: 'nodeName', headerName: 'Name', flex: 3, width: 'auto'  },
        { field: 'category', headerName: 'Category', flex: 1, width: 'auto'  },
        { field: 'status', headerName: 'Status', flex: 1, width: 'auto'  },
    ];

    const rows = props.allDevicesData.map(device => {
        return {
            id: device.id,
            nodeId: device.nodeId,
            nodeName: device.nodeName,
            category: device.category,
            status: device.status ? 'Active' : 'Inactive'
        }
    });
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}

export default Report;