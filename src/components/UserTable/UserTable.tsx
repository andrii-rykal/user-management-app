import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Fade, Tooltip, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { User } from '../../types/User';

interface UserTableProps {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const UserTable = ({
  users,
  onEdit,
  onDelete,
  loading = false,
}: UserTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 40,
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1.5 },
    { field: 'phone', headerName: 'Phone', minWidth: 130, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 100,
      flex: 0.5,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => (
        <Fade in={true}>
          <Box>
            <Tooltip title="Edit user">
              <IconButton
                size="small"
                onClick={() => onEdit(params.row.id)}
                color="primary"
                aria-label="edit user"
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete user">
              <IconButton
                size="small"
                onClick={() => onDelete(params.row.id)}
                color="error"
                aria-label="delete user"
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>
      ),
    },
  ];

  return (
    <Fade in={true}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            '& .MuiDataGrid-root': {
              width: '100%',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
            '& .MuiDataGrid-cell': {
              borderRight: '1px solid rgba(224, 224, 224, 1)',
            },
            '& .MuiDataGrid-columnHeader': {
              borderRight: '1px solid rgba(224, 224, 224, 1)',
            },
            '& .MuiDataGrid-cell:last-child': {
              borderRight: 'none',
            },
            '& .MuiDataGrid-columnHeader:last-child': {
              borderRight: 'none',
            },
          }}
        />
      </div>
    </Fade>
  );
};
