import React, {useState,useEffect, useContext} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import "./compra.css";
import api from '../../services/api';
import AuthContext from '../../store/authContext';


const columns = [
  { id: 'name',
   label: 'Name',
    minWidth: 170 ,
    
  },
  { 
    id: 'value_total', 
    label: 'preço', 
    minWidth: 100 
    
  },
  {
    id: 'date_shop',
    label: 'data',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
    fontFamily : 'Fredoka One',
  },

];

function createData(name, preço, data ) {
  
  return { name, preço,data };
}

const rows = [
  createData('compra',50,'12/10/2021'),
  createData('compra',200,'12/10/2021'),
  createData('compra',400,'12/10/2021'),
  createData('compra',212,'12/10/2021'),
  createData('compra',500,'12/10/2021'),
  createData('compra',5040,'12/10/2021'),
 
];

const useStyles = makeStyles({
  root: {
    width: '40%',
    
    
  },
  container: {
    maxHeight: 500,
    marginTop: '200px',
    
    
  },
  body:{
    fontFamily: 'Fredoka One',
    
  }
  
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#ffbe59',
    color:  '#002b5c',
    fontFamily: 'Fredoka One',
  },
  body: {
    fontSize: 24,
    
  },
}))(TableCell);



export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [shop,setShop] = useState([]);
  const austCtx = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem('token'));
  

  async function request(){
    const response = await api.post('/getsl',token);
    console.log(response);
    localStorage.setItem('slid',response.data.id)
    setShop(response.data.shoppingitems);
  }

  useEffect(()=> {
    request();
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClick(event){
    
    
  }

  return (
    
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table  stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {shop.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow onClick={handleClick} hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {

                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    
  );
}
