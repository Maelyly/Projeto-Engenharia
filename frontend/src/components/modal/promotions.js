import React,{useState} from 'react';
export default function List(props) {
  const [nome,setNome] = useState(props.nome)
  const [quant,setQuant] = useState(props.quant)
  const [percentual,setPercentual] = useState(props.percentual*100)
  //const [produto, setProduto] = useState(props.produto)
    return(
    <div>
        <div>Promoção : {nome}</div>
        <div>quantidade minima de produtos : {quant}</div>
        <div>desconto de : {percentual} %</div>
        
    </div>

  )
}