import {AiOutlineHome} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import Header from './header'
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const RateLock=() =>{

  const { loanId } = useParams()
  const navigate = useNavigate()
  const [show, setShow] = useState(true);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [ftp, setFtp] = useState('');
  const [notes, setNotes] = useState('')

  const val = document.getElementById('val');
  const exp = document.getElementById('exp');

  const handleClose = (e) => {
    setShow(false)
    if((window.screenTop && window.screenY) !== 0){
      document.exitFullscreen();
      navigate('/')
    }else{
      navigate('/')
    }
  };
  const handleSubmit = async(e) => {

    let valid = new Date(from)
    let expire = new Date(to)

    if((from === '')||(to ==='')){      
      alert('please enter all the required inputs')
      e.preventDefault()
    }
    else if(valid >= expire){
      alert('Expire date can\'t be smaller than Valid Date')
      e.preventDefault()
    }
    else if(expire > valid){
      await fetch('http://localhost:5000/api/data/ratelock' ,{
        method:'POST',
        body: JSON.stringify({
          loanId:loanId, 
          valid:from, 
          expire:to, 
          ftp:ftp, 
          notes:notes
        }),
        headers:{
          'Content-Type': 'application/json'
        }
        });
        setShow(false)
        if((window.screenTop && window.screenY) !== 0){
          document.exitFullscreen();
          navigate('/')
        }else{
          navigate('/')
        }
      }
  }
  
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

  const ModalTitle=()=>{
    return(
      <>
        <div style={{fontSize:'14px', fontWeight:500}}>
          <AiOutlineHome/> <IoIosArrowForward/> Rate Lock
        </div>
      </>
    )
  }

  const ModalMiddle=()=>{
    return(
      <>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <h3 className='pt-2'>Rate Lock</h3>
          <button data-testid='fs-redirect' id='toggle' style={{fontStyle:'italic', background:'inherit', border:'none'}} onClick={()=>fullscreen()}>Fullscreen</button>
        </div>
      </>
    )
  }

  const ModalBody=()=>{
    return(
      <>
      <p className='text-muted' style={{fontSize:'15px'}}>Status</p>
              <Form style={{marginLeft:'8px'}}>
                <Form.Check
                  inline
                  label="Standard Lock"
                  type='radio'
                  id='standard'
                  defaultChecked
                  style={{paddingRight:'15%'}}
                />
                <Form.Check
                  inline
                  disabled
                  label="Lock and Dock"
                  type='radio'
                  id='lock'
                />
              </Form>
              <form id='rateLock' style={{marginLeft:'0px'}}>
                <Row className='mt-3'>
                    <Row>
                      <Col lg={4}><label htmlFor='valid'>Valid From <span id='val' style={{color:'red', fontSize:'.9em'}}>* Required</span></label></Col>
                      <Col lg={4}><label htmlFor='expire'>Expires On <span id='exp' style={{color:'red', fontSize:'.9em'}}>* Required</span></label></Col>
                      <Col lg={4}><label htmlFor='ftp'>FTP</label></Col>
                    </Row>
                    <Row className='modalInput'>
                      <Col lg={4}><input type='date' name='valid-from' id='valid' required onChange={(e)=>{
                        setFrom(e.target.value)
                        if(e.target.value === ""){
                          val.textContent = '* Required';
                          val.style.color = 'red';
                          val.style.fontSize = '.9em';
                        } else{
                          val.textContent = '*';
                          val.style.color = 'inherit';
                          val.style.fontSize = '1em';
                        }
                        }}/></Col>
                      <Col lg={4}><input type='date' name='expires-on' id='expire' required onChange={(e)=>{
                        setTo(e.target.value)
                        if(e.target.value === ""){
                          exp.textContent = '* Required';
                          exp.style.color = 'red';
                          exp.style.fontSize = '.9em';
                        } else{
                          exp.textContent = '*';
                          exp.style.color = 'inherit';
                          exp.style.fontSize = '1em';
                        }
                        }}/></Col>
                      <Col lg={4}><input type='text' name='ftp' id='ftp' onChange={(e)=>{setFtp(e.target.value)}}/></Col>
                    </Row>
                    <Row className='mt-2'>
                      <label htmlFor='notes'>Notes</label>
                    </Row>
                    <Row style={{paddingLeft:'25px', paddingRight:'25px'}}>
                      <input type='text' name='notes' id='notes' onChange={(e)=>{setNotes(e.target.value)}}/>
                    </Row>
                    <Row>
                      <div style={{display:'flex', justifyContent:'end', padding:'3em 0 0 0'}}>
                        <button form='ratelock' style={{marginRight:'30px', padding:'8px', borderRadius:'5px', border:'none', background:'inherit'}} type='submit' data-testid='cancel' onClick={handleClose}>
                          CANCEL
                        </button>
                        <button form='ratelock' style={{padding:'8px', borderRadius:'5px', border:'none', backgroundColor:'blue', color:'white'}} type='submit'  onClick={(e)=>{handleSubmit(e)}} data-testid='save'>
                          SAVE CHANGES
                        </button> 
                      </div>
                    </Row>
                </Row>
              </form>
    </>
    )
  }

  return (
    <>
      <Header/>
      <div style={{margin:'5px 45px'}}>
      <Modal id='modalFull' show={show} onHide={handleClose} size='xl' backdrop='static' animation={false} centered>
          <Container>
            <Modal.Header closeButton style={{borderBottom:0, padding:'10px 0 0 0'}}>
            <Modal.Title id="contained-modal-title-vcenter" >
              {ModalTitle()}
            </Modal.Title>
            </Modal.Header>
              {ModalMiddle()}
            <Modal.Body>
              {ModalBody()}
            </Modal.Body>
          </Container>
      </Modal>
      </div>
    </>
  );
}

export default RateLock