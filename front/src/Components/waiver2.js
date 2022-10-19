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
  const [formValues, setFormValues] = useState([{ to: "", amount : 0, by: "", date: ""}])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { to: "", amount: 0, by: "", date: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
      <div>
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
        <form  onSubmit={handleSubmit} style={{padding:0, display:'flex'}}>
          
              <Row >
                <Col><label style={{paddingLeft:'10px'}}>Loan To</label></Col>
                <Col><label style={{paddingLeft:'8px'}}>Amunt</label></Col>
                <Col><label style={{paddingLeft:'38px'}}>Approved by</label></Col>
                <Col><label style={{paddingLeft:'35px'}}>Date</label></Col>
              </Row>
              {formValues.map((element, index) => (
            <div key={index}>
              <Row>
              <Col><input type="text" name="to" value={element.to || ""} onChange={e => handleChange(index, e)} /></Col>
              <Col><input type="text" name="amount" value={element.amount || ""} onChange={e => handleChange(index, e)} /></Col>
              <Col><input type="text" name="by" value={element.by || ""} onChange={e => handleChange(index, e)} /></Col>
              <Col><input type="text" name="date" value={element.date || ""} onChange={e => handleChange(index, e)} /></Col>
              <Col>{
                  index ? 
                    <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                  : null
                }</Col>
              </Row>
              <br/> 
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
        </form>
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
      </div>
    )
}

export default Waiver