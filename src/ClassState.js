import React from "react";

const SECURITY_CODE="CLASS";

class ClassState extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'',
            error:false,
            loading:false
        };
    }

    componentDidUpdate(){
        if (!!this.state.loading) {
            setTimeout(() => {
                if (SECURITY_CODE!==this.state.value) {
                    this.setState({loading:false,error:true});
                }else{
                    this.setState({loading:false,error:false});
                }
            }, 3000);
        }
    }
    render(){
        return (
            <div>
                <h2>Eliminar ClassState</h2>
                <p>Por favor escribe la palabra clave</p>
                {(this.state.error&&!this.state.loading)&&<p>Error: el código es incorrecto</p>}
                {this.state.loading&&<p>Cargando...</p>}
                <input type='text' placeholder="Ingrese la palabra"
                    onChange={(event)=>{this.setState({value:event.target.value})}}
                />
                <button type="button" onClick={
                    ()=>this.setState(preventState=>({loading:!preventState.loading}))
                }>Comprobar</button>
            </div>
        )
    }
}

export {ClassState};