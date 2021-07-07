import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import api from '../../services/api';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

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

export default function ModalFamilyC() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState();
  
  
  


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const changeHandlerNome = (event) => {
        setNome(event.target.value);
}
    

   
  async function handleSubmit(event){
    event.preventDefault();
    
    
    const data ={
        name: nome,
    }
    console.log(data)
    const response = await api.post("/family", data)
    localStorage.setItem("fid", response.data.id)
    console.log(response)
    setOpen(false);



  }

  return (
    <div>
      <GroupAddIcon fontSize="large" onClick ={handleOpen} className= "positionAddF"/>
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
            <h2 id="transition-modal-title">Criar Familia</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p id="transition-modal-description">Nome da Familia.</p>
                    <input type= "text" onChange ={changeHandlerNome}></input>
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