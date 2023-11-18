import React, { useState } from 'react';
import { styled } from '@mui/system';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel } from '@mui/material';

interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface Course {
  courseId: number;
  title: string;
  courseCode: string;
  description: string;
  creditHours: string;
}

interface Grade {
  gradeId: number;
  student: Student;
  course: Course;
  academicPeriod: string;
  letterGrade: string;
}

interface HeadCell {
  id: any;
  label: string;
}

interface GradeTableProps {
  handleOpen: () => void;
  handleOpenEdit: () => void;
  handleOpenRemove: () => void;
}

const headCells: HeadCell[] = [
  { id: 'student.firstName', label: 'First Name' },
  { id: 'student.lastName', label: 'Last Name' },
  { id: 'course.title', label: 'Course Title' },
  { id: 'academicPeriod', label: 'Academic Period' },
  { id: 'letterGrade', label: 'Letter Grade' },
  { id: 'actions', label: 'Actions' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: 'black',
    position: 'sticky',
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

const GradeTable: React.FC<GradeTableProps> = ({data, handleOpen, handleOpenEdit, handleOpenRemove }:any) => {
  const gradesData: Grade[] = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayData = gradesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleAdd = (id: number) => {
    handleOpen();
  };

  const handleEdit = (gradeid: number, studentid:number, courseid:number, studentfname:string, studentlname:string, coursetitle:string,academicPeriod:string, letterGrade:string) => {
    handleOpenEdit(gradeid, studentid, courseid, studentfname, studentlname, coursetitle, academicPeriod, letterGrade);
  };

  const handleRemove = (gradeid: number) => {
    handleOpenRemove(gradeid);
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
            {displayData.map((grade) => (
              <StyledTableRow key={grade.gradeId}>
                <StyledTableCell>{grade.student.firstName}</StyledTableCell>
                <StyledTableCell>{grade.student.lastName}</StyledTableCell>
                <StyledTableCell>{grade.course.title}</StyledTableCell>
                <StyledTableCell>{grade.academicPeriod}</StyledTableCell>
                <StyledTableCell>{grade.letterGrade}</StyledTableCell>
                <StyledTableCell>
                  <Button variant="contained" color="primary" size="small" style={{ margin: '5px', backgroundColor: 'white', color: 'black' }} onClick={() => handleEdit(grade.gradeId, grade.student.studentId, grade.course.courseId, grade.student.firstName, grade.student.lastName,grade.course.title, grade.academicPeriod, grade.letterGrade)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="primary" size="small" style={{ margin: '5px', backgroundColor: '#DA930B' }} onClick={() => handleRemove(grade.gradeId)}>
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
          count={gradesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default GradeTable;
