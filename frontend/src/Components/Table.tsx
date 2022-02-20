import * as React from 'react';
import {styled} from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import {useEffect} from "react";
import Button from "@mui/material/Button";
import {UserType} from "../Types/Types";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';


function createData(id: number, nickname: string, groupId: number, created: string) {
    return {id, nickname, groupId, created};
}

let rows: { id: number; nickname: string; groupId: number; created: string; }[] = []


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
    users: Array<UserType>
    setSelectedUser: (arg0: UserType) => void
    deleteSingleUser: (arg0: { id: number; }) => Promise<string>
    setShowSnackBar: React.Dispatch<React.SetStateAction<boolean>>
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
    openDialog: boolean
    isFetching: boolean
}
export default function UnstyledTable({
                                          users,
                                          deleteSingleUser,
                                          setShowSnackBar, setOpenDialog, setSelectedUser, openDialog, isFetching
                                      }: propsType) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const createDataInTable = () => {
        rows.length = 0
        if(users.length > 0) {
            users.map(user => {
                let id = user.id
                let nickname = user.nickname
                let groupId = user.groupId
                let created = user.created_at
                // @ts-ignore
                rows.push((createData(id, nickname, groupId, created)))
            })
        }
    }

    useEffect(() => {
        createDataInTable()
    }, [users,openDialog])


    const deleteUser = (userId: number) => {
        deleteSingleUser({id: userId}).then(data => {
                setShowSnackBar(true)
            }
        )
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
                    <th>nickName</th>
                    <th>group</th>
                    <th>created</th>
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
                        <td style={{width: 120}} align="center">
                            {row.nickname}
                        </td>
                        <td style={{width: 30}} align="center">
                            {row.groupId}
                        </td>
                        <td style={{width: 250}} align="right">
                            {row.created}
                        </td>
                        <td style={{width: 200}} align="center">
                            <Button key={row.id + "Edit"}
                                    variant="outlined" size={"small"} color="success"
                                    sx={{m: 1}}
                                    onClick={() => {
                                        setSelectedUser({id: row.id, nickname: row.nickname, groupId: row.groupId})
                                        setOpenDialog(true)
                                    }}>Edit</Button>
                            <Button key={row.id + "delete"}
                                    variant="outlined" size={"small"} color="warning"
                                    sx={{m: 1}}
                                    onClick={() => {
                                        deleteUser(row.id)
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
