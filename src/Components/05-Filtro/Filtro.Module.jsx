import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {setFiltroData} from '../../Reducer/FiltroInfo/FiltroSlice'
const FiltroModule = () => {
    let dispatchFiltro = useDispatch()
    const initialState = {bNombre: "", bCategoria:""}
    const bCategorias = ["Mascotas","Paisajes"]
    const [campos,setCampos] = useState(initialState)
    let {bNombre, bCategoria} = campos
    const handleChangeB = (e) => {
        let { name, type, checked, value } = e.target
        setCampos((old) => ({
            ...old,
            [name]:type === "checkbox" ? checked : value
        }))
        
    }
    const limpiarFiltro = () => {
        setCampos(initialState)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatchFiltro(setFiltroData({
            bNombre: bNombre,
            bCategoria: bCategoria,
        }))
    }
  return (
    <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center">
            <div className="col-sm-4">
                <input
                className='form-control' 
                placeholder='Buscar por nombre'
                type="text"
                name='bNombre'
                value={bNombre}
                onChange={handleChangeB}
                />
            </div>
            <div className="col-sm-4">
                <select 
                className='form-select'
                name="bCategoria"
                value={bCategoria}
                onChange={handleChangeB}
                >
                    <option value="">Seleccione una Categoría</option>
                    {
                        bCategorias.sort().map((item,index) => {
                            return(
                                <option key={index} value={`${item}`}>{item}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="col-sm-2">
                <div className="btn-group">
                <button className='btn btn-outline-dark rounded-0'>
                    Buscar
                </button>
                <button 
                    className='btn btn-outline-danger rounded-0'
                    onClick={limpiarFiltro}
                >
                    <i className="fas fa-redo-alt"></i>
                </button>
                </div>
            </div>
        </div>
    </form>
    
  )
}
export default FiltroModule