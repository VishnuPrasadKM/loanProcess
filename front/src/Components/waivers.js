// With Navigation

import {AiOutlineHome} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import Header from './Reusable/header'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from 'react-bootstrap';
import {RiDeleteBin5Line} from 'react-icons/ri'
import {useNavigate} from 'react-router-dom'

const Waivers=(prams) =>{
  console.log(typeof(prams.amt))
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false)
    navigate('/');
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Header/>
      <div style={{margin:'5px 45px'}}>
      <Modal show={show} onHide={handleClose} size='xl' centered >
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
            </div>
            <Modal.Body>
              <Container>
                <Row style={{border:'15px solid #efefef'}}>
                        <h6 style={{backgroundColor:'#97bb61b3',padding:'8px 0 8px 8px'}}>Toatal Amount ${`${prams.amt}`}</h6>
                      <Row>
                        <Col lg={4}><label htmlFor='approve'>Approved By *</label></Col>
                        <Col lg={8}><label htmlFor='reason'>Reason *</label></Col>
                      </Row>
                      <Row className='modalInput'>
                        <Col lg={4}><input type='text' id='approve' required/></Col>
                        <Col lg={8}><input type='text' id='reason' required/></Col>
                      </Row>
                      <Row className='mt-2' style={{display:'flex', justifyContent:'space-between'}}>
                        <h5 style={{width:'50%'}}>Itemization</h5>
                        <button style={{alignItems:'center', background:'inherit', border:'none', width:'50%' ,paddingLeft:'18em' }}> ADD ITEMIZATION</button>
                      </Row>
                      <Row className='mt-3' style={{paddingLeft:'10px'}}>
                        <Col ><label htmlFor='to' style={{paddingLeft:'10px'}}>Applies To *</label></Col>
                        <Col ><label htmlFor='amount' style={{paddingLeft:'8px'}}>Amount</label></Col>
                        <Col ><label htmlFor='by' style={{paddingLeft:'38px'}}>Modified By</label></Col>
                        <Col ><label htmlFor='date' style={{paddingLeft:'35px'}}>Modified Date</label></Col>
                        <Col >
                          <button style={{alignItems:'center', background:'inherit', border:'none', padding:'20px 0 0 50px'}}>
                            <RiDeleteBin5Line/>REMOVE
                          </button>
                        </Col>
                      </Row>
                      <Row style={{paddingLeft:'20px'}} className='mb-2 itemStyle'>
                        <Col><input type='text' id='to' required/></Col>
                        <Col ><p className='input-icon'><input type='number' id='amount'/><i>$</i></p></Col>
                        <Col><input type='text' id='by' /></Col>
                        <Col><input type='date' id='date' /></Col>
                        <Col >                          
                        <button className='hiddenBtn' style={{paddingLeft:'20px'}}>
                            <RiDeleteBin5Line/>Hidden Button
                        </button></Col>
                      </Row>
                  </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                CANCEL
              </Button>
              <Button variant="primary" onClick={handleClose}>
                SAVE CHANGES
              </Button>
            </Modal.Footer>
          </Container>
      </Modal>
      </div>
    </>
  );
}

export default Waivers