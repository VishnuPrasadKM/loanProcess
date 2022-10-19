import {AiOutlineHome} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import Header from './Reusable/header'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from 'react-bootstrap';
import {RiDeleteBin5Line} from 'react-icons/ri'
const Waiver=() =>{
  const [show, setShow] = useState(true);
  const [date, setDate] = useState(null);
  const [formValues, setFormValues] = useState([{ to: "", amount:0, by:"", date:"" }]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { to: "", amount:0, by:"", date:"" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Header/>
      <div style={{margin:'5px 45px'}}>
      
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
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
              {/* <button style={{alignItems:'center', background:'inherit', border:'none' }} onClick={{fullscreen}}><AiOutlineFullscreen/> FULLSCREEN</button> */}
            </div>
            <Modal.Body>
              <Container>
                <form onSubmit={handleSubmit}>
                    <Row style={{border:'15px solid #efefef'}}>
                        <h6 style={{backgroundColor:'#97bb61b3',padding:'8px 0 8px 8px'}}>Toatal Amount $32,786.00</h6>
                      <Row>
                        <Col lg={4}><label htmlFor='approve'>Approved By *</label></Col>
                        <Col lg={8}><label htmlFor='reason'>Reason *</label></Col>
                      </Row>
                      <Row className='modalInput'>
                        <Col lg={4}><input type='text' id='approve'/></Col>
                        <Col lg={8}><input type='text' id='reason'/></Col>
                      </Row>
                      <Row className='mt-2' style={{display:'flex', justifyContent:'space-between'}}>
                        <h5 style={{width:'50%'}}>Itemization</h5>
                        <button style={{alignItems:'center', background:'inherit', border:'none', width:'50%' ,paddingLeft:'18em' }}
                        onClick={() => addFormFields()}> 
                        ADD ITEMIZATION</button>
                      </Row>
                      {formValues.map((element,index)=>(
                        <div key={index}>
                      <Row className='mt-3' style={{paddingLeft:'10px'}}>
                        <Col ><label htmlFor='to' style={{paddingLeft:'10px'}}>Applies To *</label></Col>
                        <Col ><label htmlFor='amount' style={{paddingLeft:'8px'}}>Amount</label></Col>
                        <Col ><label htmlFor='by' style={{paddingLeft:'38px'}}>Modified By</label></Col>
                        <Col ><label htmlFor='date' style={{paddingLeft:'35px'}}>Modified Date</label></Col>
                        <Col >
                          <button style={{alignItems:'center', background:'inherit', border:'none', padding:'20px 0 0 50px'}} 
                            onClick={() => removeFormFields(index)}>
                            <RiDeleteBin5Line/>REMOVE
                          </button>
                        </Col>
                      </Row>
                      <Row style={{paddingLeft:'20px'}} className='mb-2 itemStyle'>
                        <Col><input type='text' id='to' value={element.to || ""} onChange={(e) => handleChange(index, e)}/></Col>
                        <Col ><p className='input-icon'><input type='number' id='amount' value={element.amount || ""} onChange={(e) => handleChange(index, e)}/><i>$</i></p></Col>
                        <Col><input type='text' id='by' value={element.by || ""} onChange={(e) => handleChange(index, e)}/></Col>
                        <Col><input type='date' id='date' value={element.date || ""} onChange={(e) => handleChange(index, e)}/></Col>
                        <Col >                          
                        <button className='hiddenBtn' style={{paddingLeft:'20px'}}>
                            <RiDeleteBin5Line/>Hidden Button
                        </button></Col>
                      </Row>
                      </div>
                      ))}
                  </Row>
                </form>
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

export default Waiver