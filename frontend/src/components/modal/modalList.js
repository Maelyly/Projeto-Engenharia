import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import api from '../../services/api';
import List from './promotions';

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

export default function ModalList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [list,setList] = useState([])


  async function handleOpen() {
    const response = await api.get('/promo')
    console.log(response)
    setList(response.data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    <div>
      <button className="positionSp" type="button" onClick={handleOpen}>
        Promoções
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
            <h2 id="transition-modal-title">Lista de Promoções</h2>
                {list.map(promotions => <List nome= {promotions.name} quant= {promotions.min_num} percentual = {promotions.promo_perc}/>)}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}