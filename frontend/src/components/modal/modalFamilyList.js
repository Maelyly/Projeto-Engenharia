import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import api from '../../services/api';
import GroupIcon from '@material-ui/icons/Group';
import List from './family';

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

export default function ModalFamilyL() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState();
  const [list,setList] = useState([])


  async function handleOpen(){
    const response = await api.post("/family/list")
    setList(response.data)
    console.log(response)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const changeHandlerNome = (event) => {
        setNome(event.target.value);
}

   

  return (
    <div>
      <GroupIcon fontSize="large" onClick ={handleOpen} className= "positionF"/>
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
            <h2 id="transition-modal-title">Familia</h2>
            {list.map(family => <List nome= {family.name} user_name= {family.user_name} />)}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}