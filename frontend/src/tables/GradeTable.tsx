import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel } from '@mui/material';


interface Student {
    studentID: string;
    studentName: string;
    grade: string;
    actions:any;
  }
  
  interface HeadCell {
    id: keyof Student;
    label: string;
  }
  
  const studentsData: Student[] = [
    { studentID: '1', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '2', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '3', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '4', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '5', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '6', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '7', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '8', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '9', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '10', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '11', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '12', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '13', studentName: 'John Doe', grade: 'A', actions:'' },
    { studentID: '14', studentName: 'John Doe', grade: 'A', actions:'' },
    // Add more students as needed
  ];
  
  const headCells: HeadCell[] = [
    { id: 'studentID', label: 'Student ID' },
    { id: 'studentName', label: 'Student Name' },
    { id: 'grade', label: 'Grade' },
    { id: 'actions', label: 'Actions' }, // Add 'Actions' column
  ];
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      positon: 'sticky',
      top: 0,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F6F8FB',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

const GradeTable = ({ handleopen, handleOpenEdit, handleOpenRemove}:any) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const displayData = studentsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      const handleAdd = (id: string) => {
        handleopen()
      };
    
      const handleEdit = (id: string) => {
        handleOpenEdit()
      };
    
      const handleRemove = (id: string) => {
        handleOpenRemove()
      };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              {headCells.map((headCell) => (
                <StyledTableCell key={headCell.id}>
                  {headCell.label === 'Actions' ? (
                    headCell.label
                  ) : (
                    <TableSortLabel>{headCell.label}</TableSortLabel>
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {displayData.map((student) => (
              <StyledTableRow key={student.studentID}>
                <StyledTableCell>{student.studentID}</StyledTableCell>
                <StyledTableCell>{student.studentName}</StyledTableCell>
                <StyledTableCell>{student.grade}</StyledTableCell>
                <StyledTableCell>
                    <Button variant="contained" color="primary" size='small' style={{margin:'5px', backgroundColor: '#4CAF50'}} onClick={() => handleAdd(student.studentID)}>
                    Add
                    </Button>
                    <Button variant="contained" color="primary" size='small' style={{margin:'5px', backgroundColor:'white', color:'black'}} onClick={() => handleEdit(student.studentID)}>
                    Edit
                    </Button>
                    <Button variant="contained" color="primary" size='small' style={{margin:'5px', backgroundColor:'#DA930B'}} onClick={() => handleRemove(student.studentID)}>
                    Remove
                    </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={studentsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}

export default GradeTable

