import * as React from 'react';
import {styled} from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import {useEffect} from "react";
import Button from "@mui/material/Button";
import {GroupType} from "../Types/Types";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';


function createData(id: number, name: string, description: string) {
    return {id, name, description};
}

let rows: { id: number; name: string; description: string; }[] = []


const blue = {
    200: '#A5D8FF',
    400: '#3399FF',
};

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const Root = styled('div')(
    ({theme}) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  }
  `,
);

const CustomTablePagination = styled(TablePaginationUnstyled)(
    ({theme}) => `
  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }
  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }
  & .MuiTablePaginationUnstyled-select {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    background-color: transparent;
    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }
  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }
  & .MuiTablePaginationUnstyled-actions {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    text-align: center;
  }
  & .MuiTablePaginationUnstyled-actions > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 2px;
    background-color: transparent;
    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }
    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }
  `,
);
type  propsType = {
    groups: Array<GroupType>
    deleteSingleGroup: (arg0: { id: number; }) => Promise<void>
    setSelectedGroup: (arg0: GroupType) => void
    setShowSnackBar: React.Dispatch<React.SetStateAction<boolean>>
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
    openDialog: boolean
    isFetching: boolean
}
export default function GroupTable({
                                       groups, deleteSingleGroup, setSelectedGroup,
                                       setShowSnackBar, setOpenDialog, openDialog, isFetching
                                   }: propsType) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const createDataInTable = () => {
       rows.length = 0
       groups.map(group => {
           let id = group.id
           let name = group.name
           let description = group.description
           // @ts-ignore
           rows.push((createData(id, name, description)))
       })
   }
        useEffect(()=>{
            createDataInTable()
        },[groups])


    const deleteGroup = (groupId:number) => {
        deleteSingleGroup({id:Number(groupId)})
        setShowSnackBar(true)
        setPage(0)
    }


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Root sx={{width: 700, maxWidth: '100%', margin: " 0 auto"}}>
            <table aria-label="custom pagination table">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>action</th>
                </tr>
                </thead>
                <tbody>
                {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                ).map((row, index) => (
                    <tr key={uuidv4()}>
                        <td style={{width: 30}}>{row.id}</td>
                        <td style={{width: 60}} align="center">
                            {row.name}
                        </td>
                        <td style={{width: 90}} align="center">
                            {row.description}
                        </td>
                        <td style={{width: 100}} align="center">
                            <Button key={row.id + "Edit"}
                                    variant="outlined" size={"small"} color="success"
                                    sx={{m: 1}}
                                    onClick={() => {
                                        setSelectedGroup({id: row.id, name: row.name, description: row.description})
                                        setOpenDialog(true)
                                    }}>Edit</Button>
                            <Button key={row.id + "delete"}
                                    variant="outlined" size={"small"} color="warning"
                                    sx={{m: 1}}
                                    onClick={() => {
                                        deleteGroup(row.id)
                                    }}>Delete</Button>
                        </td>
                    </tr>
                ))}

                {emptyRows > 0 && (
                    <tr style={{height: 41 * emptyRows}}>
                        <td colSpan={3}/>
                    </tr>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <CustomTablePagination
                        rowsPerPageOptions={[5, 10, 35, {label: 'All', value: -1}]}
                        colSpan={4}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        componentsProps={{
                            select: {
                                'aria-label': 'rows per page',
                            },
                            actions: {
                                showFirstButton: true,
                                showLastButton: true,
                            } as any,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </tr>
                </tfoot>
            </table>
        </Root>
    );
}
