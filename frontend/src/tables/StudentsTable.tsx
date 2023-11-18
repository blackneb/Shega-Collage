import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import StudentAddCourseModal from '../modals/StudentAddCourseModal';
import StudentViewCourseModal from '../modals/StudentViewCourseModal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  borderRadius: '10px',
  borderColor:'white',
  boxShadow: 24,
  p: 4,
};

interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface HeadCell {
  id: keyof Student;
  label: string;
}

const headCells: HeadCell[] = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: 'black',
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


const StudentsTable = ({ data }: any) => {
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [openView, setOpenView] = React.useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  const studentsData: Student[] = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [studentId, setStudentId] = useState<number>()
  const [orderBy, setOrderBy] = useState<keyof Student>('firstName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  
  const handleAddCourse = (studentid:number) => {
    setStudentId(studentid)
    handleOpenAdd()
  }
  const handleViewCourse = (studentid:number) => {
    setStudentId(studentid)
    handleOpenView()
  }
  const handleChangePage = (_: any, newPage: number) => {
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
    return [...studentsData].sort(comparator);
  };

  const displayData = sortedData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className='h-96'>
      <div>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StudentAddCourseModal studentId={studentId} handleCloaeAdd={handleCloseAdd}/>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openView}
          onClose={handleCloseView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StudentViewCourseModal studentId={studentId}/>
          </Box>
        </Modal>
      </div>
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
              <StyledTableRow key={student.studentId}>
                <StyledTableCell>{student.firstName}</StyledTableCell>
                <StyledTableCell>{student.lastName}</StyledTableCell>
                <StyledTableCell>{student.email}</StyledTableCell>
                <StyledTableCell>{student.phoneNumber}</StyledTableCell>
                <StyledTableCell>
                  <Button variant="contained" color="primary" size="small" style={{ margin: '5px', backgroundColor: 'white', color: 'black' }} onClick={() => handleAddCourse(student.studentId)}>
                    Add course
                  </Button>
                  <Button variant="contained" color="primary" size="small" style={{ margin: '5px', backgroundColor: '#DA930B' }} onClick={() => handleViewCourse(student.studentId)}>
                    View Course
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
  );
};

export default StudentsTable;
