import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#002b5c",
    color: "#ffbe59",
    border: '2px solid #000',
    fontFamily: 'Fredoka One',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState();
  const [preço, setPreço] = useState();
  const [categoria, setCategoria] = useState();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandlerNome = (event) => {
    setNome(event.target.value);
}

  const changeHandlerPreço = (event) => {
    setPreço(event.target.value);
}

  const changeHandlerCategoria = (event) => {
    setCategoria(event.target.value);
}


  async function handleSubmit(event){
    event.preventDefault();
    const data ={
        name: nome,
        price: preço,
        category: categoria
    }
    const response = await api.post("/products", data)
    console.log(response)
    setOpen(false);



  }

  return (
    <div>
      <button className="positionPr" type="button" onClick={handleOpen}>
        Adicionar Produto
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Criar Produto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p id="transition-modal-description">Nome.</p>
                    <input type= "text" onChange ={changeHandlerNome}></input>
                </label>
                <label>
                    <p id="transition-modal-description">Preço.</p>
                    <input type= "text" onChange ={changeHandlerPreço}></input>
                </label>
                <label>
                    <p id="transition-modal-description">Categoria.</p>
                    <input type= "text" onChange= {changeHandlerCategoria}></input>
                </label>
                <button type="submit">
                    criar
                </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}