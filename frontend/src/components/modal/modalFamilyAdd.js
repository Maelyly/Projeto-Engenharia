import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import api from '../../services/api';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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

export default function ModalFamilyA() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState();
  const [quant, setQuant] = useState();
  const [percentual, setPercentual] = useState();
  const [produto,setProduto] = useState();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const changeHandlerNome = (event) => {
        setNome(event.target.value);
}

    const changeHandlerQtd = (event) => {
        setQuant(event.target.value);
}

    const changeHandlerPercentual = (event) => {
        setPercentual(event.target.value);
}
    const changeHandlerProduto = (event) => {
        setProduto(event.target.value);
}

  async function handleSubmit(event){
    event.preventDefault();
    const data ={
        name: nome,
        min_num: quant,
        promo_perc: percentual,
        prod: produto
    }
    const response = await api.post("/create/promo", data)
    console.log(response)
    setOpen(false);



  }

  return (
    <div>
      <PersonAddIcon fontSize="large" className="positionFamilyAdd" onClick={handleOpen}/>
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
            <h2 id="transition-modal-title">Adicionar Familiar</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p id="transition-modal-description">Nome de Usuario.</p>
                    <input type= "text" onChange ={changeHandlerNome}></input>
                </label>
                <button type="submit">
                    Adicionar
                </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
