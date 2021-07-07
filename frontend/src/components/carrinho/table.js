import React,{useState, useEffect} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import api from '../../services/api';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {Link, useHistory } from "react-router-dom";



const columns = [
  { id:'products',
    label: 'Name',
    minWidth: 170 ,
    align: 'left',
  },
  { 
    id: 'quant', 
    label: 'quantidade', 
    minWidth: 170,
    align: 'left',
  },
  { 
    id: 'total_price', 
    label: 'preço', 
    minWidth: 170 ,
    align: 'left',
    
  },
  {
    id: 'category',
    label: 'categoria',
    minWidth: 100,
    align: 'left',
    fontFamily : 'Fredoka One',
  },

];



/*function createData(name, quantidade, preço, categoria) {
  
  return { name,quantidade, preço,categoria };
}


const rows = [
  /*createData('guarana',5,50,'bebida'),
  createData('bolo',2,200,'comida'),
  createData('vinho',1,400,'bebida'),
  createData('carne',7,212,'comida'),
  createData('agua',10,500,'bebida'),
  createData('pão',15,5040,'comida'),
  createData('pão',15,5040,'comida'),
  createData('pão',15,5040,'comida'),
  createData('pão',15,5040,'comida'),
  
 
];*/

const useStyles = makeStyles({
  root: {
    width: '100%',
    
    
  },
  container: {
    maxHeight: 450,
    marginTop: '100px',
    
    
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
  const [produto,setProduto] = useState();
  const [count, setCount] = useState(0);
  const history = useHistory();

    async function list(){
      const id = {
        id: localStorage.getItem('siid')
      }
      const response = await api.post('/loadsi',id)
      addProduto(response.data.items);
      
    } 
    useEffect(()=> {
      list()
    },[])
    
    function changeHandleProduto(event){
        setProduto(event.target.value);
    }

    function handleSave(){
      history.replace('/home')
    }

    function handleIncrement(event){
       event.preventDefault()
        setCount(count + 1 );
    };
  
    function handleDecrement(event){
      event.preventDefault()
      if(count > 0){
        setCount(count - 1 );
      }
    };

    async function handleCLick(event){
        event.preventDefault();

        const dataP = {
          name : produto,
      }
        if(count > 0){
          const response = await api.post('/getproducts', dataP)
          const item ={
            products: response.data.name,
            quant: count
          }
          const response2 =  await api.post('/getitem', item)
          console.log(response2)

          const data = {
            siid: localStorage.getItem('siid'),
            itemid: response2.data.id, 
          }
          try{
            const response3 = await api.post('/additem',data)
            console.log(response3)
          }catch(error){
            
          }

          const id = {
            id: localStorage.getItem('siid')
          }
          const response4 = await api.post('/loadsi',id)
          console.log(response4)
          var i
          const listaT = {
            name : response4.data,
            preço : response.data.price,
            quantidade: count,
            categoria : response.data.category
          }

         
          addProduto(response4.data.items);
        }
          else{
            alert('escolha a quantidade');
          
        
          }
    }
  


  function addProduto(produto){
    setShop(produto);
  }
   
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    let value = row[column.id];
                    if(column.id === "products"){
                      value = row[column.id].name
                    }
                    else if(column.id === "category")
                      value = row["products"].category
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
        count={shop.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
      
    <form >
      <label>
        <p className = "produto-label">Produto</p>
          <input type="text"  className= "posicaProduto" onChange= {changeHandleProduto}/>
          </label>
          <button className="posicaobutton" onClick={handleCLick}>
            Adicionar
          </button>
          <ButtonGroup className="buttonG">
            <button onClick={handleIncrement}>+</button>
            <button disabled={true}>{count}</button>
            <button onClick={handleDecrement}>-</button>
          </ButtonGroup>
    </form>
    <button className='positionSave' onClick={handleSave}>
            Home
    </button>
  </div>

  );
}
