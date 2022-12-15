import {AiOutlineHome} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import Header from './Reusable/header'
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from 'react-bootstrap';
import {RiDeleteBin5Line} from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom';

const Waiver=() =>{

  const { loanId } = useParams()
  const navigate = useNavigate()

  const [approve, setApprove] = useState('');
  const [reason, setReason] = useState('');
  const [show, setShow] = useState(true);
  const [formValues, setFormValues] = useState([{ to: "", amount : 0, by: "", date: ""}])
  let counter = 0;

  const handleClose = (e) => {
    setShow(false)
    navigate('/')
    sessionStorage.removeItem('amount')
  };

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { to: "", amount: 0, by: "", date: "" }]);

    }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };
    const fullscreen = () => {
    let myDocument = document.documentElement;
    let toggleScreen = document.getElementById('toggle');
    let modalToggle = document.getElementById('modalFull');
      if(toggleScreen.innerText === "Fullscreen"){
        myDocument.requestFullscreen();
        modalToggle.classList.add('modal-fullscreen');
        modalToggle.classList.add('modal-fullscreen')
        toggleScreen.innerHTML = 'Exit Fullscreen';
      } else{
        document.exitFullscreen();
        modalToggle.classList.remove('modal-fullscreen')
        toggleScreen.innerHTML = 'Fullscreen'
      }
    }

    const itemsError = () => {
      
    }

    const postData = async() => {
      console.log(waiver);
      let waiverData = await fetch('http://localhost:5000/api/data/waiver' ,{
        method:'POST',
        body: JSON.stringify({
          loanId:waiver.loanId, 
          approve:waiver.approve, 
          reason:waiver.reason, 
          item:waiver.items
        }),
        headers:{
          'Content-Type': 'application/json'
        }
        });
        waiverData = await waiverData.json();
        console.log(waiverData);
    }

    const waiver ={loanId:loanId, approve, reason, items:[]};
    let handleSubmit = async(event) => {
      event.preventDefault();
      const app = document.getElementById('app');
      const apr = document.getElementById('apr');
      const res = document.getElementById('res');
      if((approve === '')&&(reason ==='')){  
        // alert('Please Enter all required inputs');
        apr.textContent = '* Required'
        apr.style.color = 'red'
        apr.style.fontSize = '1.5em'
        res.textContent = '* Required'
        res.style.color = 'red'
        res.style.fontSize = '1.5em'
        app.textContent = '* Required'
        app.style.color = 'red'
        app.style.fontSize = '1.5em'
      } else if(approve == ""){
        res.textContent = '*'
        res.style.color = 'inherit'
        res.style.fontSize = '1em'
        apr.textContent = '* Required'
        apr.style.color = 'red'
        apr.style.fontSize = '1.5em'
      } else if(reason == ""){
        res.textContent = '* Required'
        res.style.color = 'red'
        res.style.fontSize = '1.5em'
        apr.textContent = '*'
        apr.style.color = 'inherit'
        apr.style.fontSize = '1em'
      } else{
          waiver.approve = approve;
          waiver.reason = reason;
          // Looping to check itemization

          formValues.forEach( value => {
          if(value.to == "" || null || undefined){
            // alert('Please enter applies to')
            apr.textContent = '*'
            apr.style.color = 'inherit'
            apr.style.fontSize = '1em'
            res.textContent = '*'
            res.style.color = 'inherit'
            res.style.fontSize = '1em'
            app.textContent = '* Required'
            app.style.color = 'red'
            app.style.fontSize = '1.5em'
            console.log('error 1');
          }
          else if(((value.amount) > Number(sessionStorage.getItem('amount')))){
            console.log(parseInt(value.amount));
            console.log(parseInt(sessionStorage.getItem('amount')));
            console.log((parseInt(value.amount) > parseInt(sessionStorage.getItem('amount'))));
            alert('Waiver amount cannot be more than Loan Amount')
            console.log('error 2');
          }
          else{
            waiver.items.push({appliesTo:value.to, amount:value.amount, modifiedBy:value.by, date:value.date});
            console.log('no error');
            console.log(waiver.items.length);
          }
        })
        // loop ends
        postData();
        setShow(false);
        navigate('/');
      sessionStorage.removeItem('amount');
    }
  }

    return (
      <div>
        <Header/>
      <div style={{margin:'5px 45px'}}>
      <Modal id='modalFull' show={show} onHide={handleClose} size='xl' backdrop='static' animation={false} centered >
          <Container>
            <Modal.Header closeButton style={{borderBottom:0, padding:'10px 0 0 0'}}>
            <Modal.Title id="contained-modal-title-vcenter" >
              <div style={{fontSize:'14px', fontWeight:500}}>
                <AiOutlineHome/> <IoIosArrowForward/> Waivers
                </div>
            </Modal.Title>
            </Modal.Header>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <h3 className='pt-2'>Waivers</h3>
              <button data-testid='fs-redirect' id='toggle' style={{fontStyle:'italic', background:'inherit', border:'none'}} onClick={()=>fullscreen()}>Fullscreen</button>
            </div>
            <Modal.Body>
              <Container>
                <Row style={{border:'15px solid #efefef'}}>
                        <h6 style={{backgroundColor:'#97bb61b3',padding:'8px 0 8px 8px'}}>Total Amount ${sessionStorage.getItem('amount')}</h6>
                      <Row>
                        <Col lg={4}><label htmlFor='approve'>Approved By <span id='apr'>*</span></label></Col>
                        <Col lg={8}><label htmlFor='reason'>Reason <span id='res'>*</span></label></Col>
                      </Row>
                      <Row className='modalInput'>
                        <Col lg={4}><input type='text' id='approve' onChange={(e)=> setApprove(e.target.value)}/></Col>
                        <Col lg={8}><input type='text' id='reason' onChange={(e)=> setReason(e.target.value)}/></Col>
                      </Row>
                      <Row className='mt-2' style={{display:'flex', justifyContent:'space-between'}}>
                        <h5 style={{width:'50%'}}>Itemization</h5>
                        <button style={{alignItems:'center',  backgroundColor:'#9c9998e', border:'none', width:'14%', padding:0 }}
                        onClick={() => {
                          addFormFields();
                          }}> 
                        ADD ITEMIZATION</button>
                      </Row>

        <form id='waiverForm' onSubmit={handleSubmit} style={{ display:'block', paddingBottom:'30px'}}>
          
              <Row style={{width:'100%'}}>
                <Col style={{width:'23.75%'}}><label>Applies To <span id='app'>*</span></label></Col>
                <Col style={{width:'23.75%'}}><label>Amount</label></Col>
                <Col style={{width:'23.75%'}}><label>Modified by</label></Col>
                <Col style={{width:'23.75%'}}><label>Date</label></Col>
                <Col style={{width:'5%'}}>{<button style={{visibility:'hidden'}}/>}</Col>
              </Row>
              {formValues.map((element, index) => (
              <Row style={{width:'100%'}} key={index} className='mt-2'>
              <Col ><input style={{width:'100%'}} type="text" name="to" value={element.to || ""} onChange={e => handleChange(index, e)} /></Col>
              <Col ><span style={{display:'flex', alignItems:'center'}}>$ <input style={{width:'100%'}} type="number" name="amount" value={element.amount || ""} onChange={e => handleChange(index, e)} /></span></Col>
              <Col ><input style={{width:'100%'}} type="text" name="by" value={element.by || ""} onChange={e => handleChange(index, e)} /></Col>
              <Col ><input style={{width:'100%'}} type="date" name="date" value={element.date || ""} onChange={e => handleChange(index, e)} /></Col>
              <Col >{
                  index+1 ? 
                    <button style={{border:'none', background:'inherit', paddingLeft:'15px'}} type="button"  className="button remove" onClick={() => {
                      removeFormFields(index);
                    }}><RiDeleteBin5Line/> Remove</button> 
                  : null
                }</Col>
              </Row>
          ))}
        </form>
        </Row>
          </Container>
            </Modal.Body>
            <Modal.Footer>
            <button form='waiverForm' type='submit' style={{padding:'5px', border:'none', background:'inherit'}} onClick={handleClose}>
                CANCEL
              </button>
              <button form='waiverForm' type='submit' style={{padding:'5px', border:'none', color:'white', background:'blue'}}>
                SAVE CHANGES
              </button>
            </Modal.Footer>
          </Container>
      </Modal>
      </div>
      </div>
    )
}

export default Waiver