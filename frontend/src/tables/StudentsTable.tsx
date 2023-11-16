import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel } from '@mui/material';

interface Student {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    numberofcourses: number;
  }
  
  interface HeadCell {
    id: keyof Student;
    label: string;
  }

  
const studentsData: Student[] = [
    { id: 1, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 2, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 3, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 4, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 5, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 6, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 7, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 8, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 9, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 10, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 11, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 12, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 13, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 14, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 15, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 16, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 17, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    { id: 18, name: 'John Doe', phone_number: '123-456-7890', email: 'john@example.com', numberofcourses: 5 },
    // Add more students as needed
  ];

  const headCells: HeadCell[] = [
    { id: 'name', label: 'Name' },
    { id: 'phone_number', label: 'Phone Number' },
    { id: 'email', label: 'Email' },
    { id: 'numberofcourses', label: 'Number of Courses' },
  ];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      positon: 'sticky',
      top:0,
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
  

const StudentsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState<keyof Student>('name');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const handleChangePage = (_:any, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const handleRequestSort = (property: keyof Student) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
      const sortedData = () => {
        const comparator = (a: Student, b: Student) => {
          if (order === 'asc') {
            return a[orderBy] > b[orderBy] ? 1 : -1;
          } else {
            return b[orderBy] > a[orderBy] ? 1 : -1;
          }
        };
        return studentsData.sort(comparator);
      };
    
      const displayData = sortedData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
  return (
    <div className='h-96'>
       <TableContainer style={{ maxHeight: 400 }}>
        <Table>
            <TableHead>
            <StyledTableRow>
                {headCells.map((headCell) => (
                <StyledTableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                    >
                    {headCell.label}
                    </TableSortLabel>
                </StyledTableCell>
                ))}
            </StyledTableRow>
            </TableHead>
            <TableBody>
            {displayData.map((student) => (
                <StyledTableRow key={student.id}>
                <StyledTableCell>{student.name}</StyledTableCell>
                <StyledTableCell>{student.phone_number}</StyledTableCell>
                <StyledTableCell>{student.email}</StyledTableCell>
                <StyledTableCell>{student.numberofcourses}</StyledTableCell>
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

export default StudentsTable
