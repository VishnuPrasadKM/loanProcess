import {AiOutlineHome} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import Header from './Reusable/header'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Form, Row } from 'react-bootstrap';
import {AiOutlineFullscreenExit} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const RateLockFull=() =>{

  const navigate = useNavigate()
  const [show, setShow] = useState(true);
  const [full, setFull] = useState(false)

  const handleClose = (e) => {
    setShow(false)
    navigate('/')
    e.preventDefault()
  };
  const handleShow = () => setShow(true);
  const handleScreen = () => setFull(false)
  const fullscreen = () => setFull(true)

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
          <button style={{alignItems:'center', background:'inherit', border:'none' }} onClick={()=>navigate('/ratelock')}><AiOutlineFullscreenExit/> MINIMIZE</button>
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
                      <Col lg={4}><label htmlFor='valid' required>Valid From *</label></Col>
                      <Col lg={4}><label htmlFor='expire' required>Expires On *</label></Col>
                      <Col lg={4}><label htmlFor='ftp'>FTP</label></Col>
                    </Row>
                    <Row className='modalInput'>
                      <Col lg={4}><input type='date' id='valid'/></Col>
                      <Col lg={4}><input type='date' id='expire'/></Col>
                      <Col lg={4}><input type='text' id='ftp'/></Col>
                    </Row>
                    <Row className='mt-2'>
                      <label htmlFor='notes'>Notes</label>
                    </Row>
                    <Row style={{paddingLeft:'20px'}}>
                      <input type='text' id='notes' />
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
      <Modal show={show} onHide={handleClose} size='xl' centered fullscreen>
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
            <Modal.Footer style={{borderTop:0}}>
              <Button variant="secondary" onClick={handleClose}>
                CANCEL
              </Button>
              <Button type='submit' form='rateLock'  onClick={handleClose}>
                SAVE CHANGES
              </Button>
            </Modal.Footer>
          </Container>
      </Modal>
      </div>
    </>
  );
}

export default RateLockFull