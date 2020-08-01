import React, { Fragment, useEffect, useContext } from "react";
import { HolidayContext } from "../../context/holiday-context";
import List from "../list";
import Form from "../form";
import Error from "../error";
import Loading from "../loading";
import Header from "../common/header";
import Footer from "../common/footer";
import { getHolidays } from '../utilities/utils';
import './style.css';

const Main = () => {
  // Subscribe to `holidays` state and access dispatch function
  const [state, dispatch] = useContext(HolidayContext);
    const setLoading = (param) => {
        dispatch({type: "LOADING", payload:param});
    }
    const setError = (param) => {
        dispatch({type: "ERROR", payload:param});
    }    
    const getList = async () => {
        try{
            setLoading(true);
            let resultado = await getHolidays();
            if (resultado.data && resultado.data.cod === 0 && resultado.data.entity){
                dispatch({
                    type: "FILL_HOLIDAY",
                    payload: resultado.data.entity
                  });
            } else {
                setError(true);
            }
            setLoading(false);
        } catch(err){
            console.log('err en getList',err);
            setLoading(false);
            setError(true);
        }
    }
    /*
    Si estás familiarizado con el ciclo de vida de las clases de React y sus métodos, 
    el Hook useEffect equivale a: 
    componentDidMount, componentDidUpdate y componentWillUnmount combinados.  
    */
    useEffect(() => {    
        getList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
   
    if (state.error){
        return (
            <Error></Error>
        );
    } else  {

        return (
            <div className="container is-fluid main-container">
                <Header></Header> 
                <div className="container is-fluid main">                
                    {state.loading && (
                        <Loading></Loading>
                    )}
                    {!state.loading && (
                        <Fragment>
                            <Form></Form>
                            <List></List>
                        </Fragment>
                    )}       
                </div>
                <Footer></Footer>
            </div>
        );

    }
};
export default Main;