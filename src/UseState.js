import React,{useState,useEffect} from "react";

const SECURITY_CODE="USE";

function UseState(props) {
    const [state, setState] = useState({
        value:"",
        error:false,
        loading:false,
        deleted:false,
        confirmed:false
    })
    /*
    const [value, setValue] = useState('')
    const [error,setError]=useState(false);
    const [loading, setLoading] = useState(false)
    */

    const onConfirm=()=>{
        setState({
            ...state,
            value:'',
            loading:false,
            error:false,
            confirmed:true
        });
    }

    const onError=()=>{
        setState({
            ...state,
            loading:false,
            error:true
        });
    }

    const onWrite=(text)=>{
        setState({...state,value:text})
    }

    const onCheck=()=>{
        setState({...state,loading:true,error:false})
    }

    const onDelete=()=>{
        setState({...state,deleted:true})
    }

    const onReset=()=>{
        setState({...state,deleted:false,confirmed:false,value:''})
    }

    useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if(state.value===SECURITY_CODE){
                    onConfirm();
                }else{
                    onError();
                }
            }, 3000);
        }
    }, [state.loading])
    
    if(!state.deleted&&!state.confirmed){
        return(
            <div>
                <h2>Eliminar UseState</h2>
                <p>Por favor escribe la palabra clave </p>
                {state.error&&<p>Error: el código es incorrecto</p>}
                {state.loading&&<p>Cargando...</p>}
                <input type='text' placeholder="Ingrese la palabra" value={state.value} 
                onChange={(event)=>{onWrite(event.target.value)}}/>
                <button type="button" onClick={()=>{onCheck()}}>Comprobar</button>
            </div>
        )
    }else if (!state.deleted && !!state.confirmed) {
        console.log(state)
        return (
            <div>
                <p>¿SEGURO?</p>
                <button type="button" onClick={()=>onDelete()}>SI</button>
                <button type="button" onClick={()=>onReset()} >NO</button>
            </div>
        )
    }else if(!!state.confirmed&&!!state.deleted){
        return (
            <div>
                <p>BORRADO EL USESTATE</p>
                <button type="button" onClick={()=>onReset()} >RECUPERAR</button>
            </div>
        )
    }


}

export {UseState};