import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel } from '@mui/material';

interface Course {
  courseId: number;
  title: string;
  courseCode: string;
  description: string;
  creditHours: string;
}

interface HeadCell {
  id: keyof Course;
  label: string;
}



const headCells: HeadCell[] = [
  { id: 'title', label: 'Title' },
  { id: 'courseCode', label: 'Course Code' },
  { id: 'description', label: 'Description' },
  { id: 'creditHours', label: 'Credit Hours' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CourseTable = ({data}:any) => {
  const coursesData:Course[] = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Course>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Course) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = () => {
    const comparator = (a: Course, b: Course) => {
      if (order === 'asc') {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return b[orderBy] > a[orderBy] ? 1 : -1;
      }
    };
    return coursesData.sort(comparator);
  };

  const displayData = sortedData().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <TableContainer>
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
            {displayData.map((course) => (
              <StyledTableRow key={course.courseId}>
                <StyledTableCell>{course.title}</StyledTableCell>
                <StyledTableCell>{course.courseCode}</StyledTableCell>
                <StyledTableCell>{course.description}</StyledTableCell>
                <StyledTableCell>{course.creditHours}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={coursesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default CourseTable;
