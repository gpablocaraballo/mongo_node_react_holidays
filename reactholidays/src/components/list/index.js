import React, { Fragment, useContext, useEffect, useState } from "react";
import './style.css';
import { HolidayContext } from "../../context/holiday-context";
import {deleteHolidays} from "../utilities/utils";
import iconDelete from '../../assets/delete.png';

export default function List() {
    // Subscribe to `holidays` state and access dispatch function
    const [state, dispatch] = useContext(HolidayContext);
    const [isloading, setIsLoading] = useState(true);

    const setLoading = (param) => {
        dispatch({type: "LOADING", payload:param});
    }
    const setError = (param) => {
        dispatch({type: "ERROR", payload:param});
    }
    const cleanCurrent = () => {
        dispatch({type: "CLEAN_CURRENT", payload:null});
    }
    const delHoliday = id => {
        dispatch({type: "DEL_HOLIDAY", payload: id});
    };
    const setHoliday = item => {
        dispatch({type: "CURRENT", payload: item});
    };
    const deleteHoliday = async (pid) => {
        try{
            setLoading(true);
            let resultado = await deleteHolidays(pid);
            if (resultado.data && resultado.data.cod === 0){
                delHoliday(pid);
                cleanCurrent();
            } else {
                setError(true);
            }
            setLoading(false);
        } catch(err){
            console.log('err en deleteHoliday',err);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        if (state.loading !== isloading){
            setIsLoading(state.loading);
            try{
                let radiosbtn = document.getElementsByName("radioholidays");
                for (let x=0;x<radiosbtn.length;x++) radiosbtn[x].checked = false;
            } catch(err){

            }
        }
        // eslint-disable-next-line
    }, [state.loading]);    

    return (
        <Fragment>
            <table className="table is-striped is-fullwidth is-bordered is-hoverable">
                <thead>
                    <tr>
                        <th><abbr title="Fecha">Sel</abbr></th>
                        <th><abbr title="Fecha">Date</abbr></th>
                        <th><abbr title="Fecha">Id</abbr></th>
                        <th className="is-hidden-touch" ><abbr title="Tipo">Type</abbr></th>
                        <th className="is-hidden-touch" ><abbr title="Motivo">Reason</abbr></th>
                        <th><abbr title="Action"></abbr></th>
                    </tr>
                </thead>
                <tbody>                      
                    {state.holidays.map((item, index) => {
                        return (
                            <tr className="rowClass" key={index}  >
                                <td><abbr title="Choose"><input type="radio" name="radioholidays" onClick={() => setHoliday(item)} /></abbr></td>
                                <td><abbr title="Date">{item.dia}/{item.mes}/{item.anio}</abbr></td>
                                <td><abbr title="Id">{item.id}</abbr></td>
                                <td className="is-hidden-touch" ><abbr title="Type">{item.tipo}</abbr></td>
                                <td className="is-hidden-touch" ><abbr title="Reason">{item.motivo}</abbr></td>
                                <td><abbr title="Delete"><img className="iconDelete" src={iconDelete} alt="Delete holiday" onClick={() => deleteHoliday(item._id)} /></abbr></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    );

}