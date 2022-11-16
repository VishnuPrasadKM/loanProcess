import {AiOutlineHome} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'
import Header from './Reusable/header'
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from 'react-bootstrap';
import {RiDeleteBin5Line} from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom';
import {AiOutlineFullscreen} from 'react-icons/ai'

const WaiversFull=() =>{

  const { loanId } = useParams()
  const navigate = useNavigate()

  const [approve, setApprove] = useState('');
  const [reason, setReason] = useState('');
  const [show, setShow] = useState(true);
  const [formValues, setFormValues] = useState([{ to: "", amount : 0, by: "", date: ""}])

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
        setFormValues([...formValues, { to: "", amount: 0, by: "", date: "" }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        if((approve === '')||(reason ==='')){  
          alert('Please Enter all required inputs')
        }
        else if(((formValues[0].amount) > (sessionStorage.getItem('amount')))){
          alert('Waiver amount cannot be more than Loan Amount')
        }
          let waiver = [loanId, approve, reason, formValues[0].to, formValues[0].amount, formValues[0].by, formValues[0].date]
          sessionStorage.setItem('waiver', waiver)
    }

    return (
      <div>
        <Header/>
      <div style={{margin:'5px 45px'}}>
      <Modal show={show} onHide={handleClose} size='xl' centered fullscreen>
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
              <button data-testid='fs-redirect' style={{alignItems:'center', background:'inherit', border:'none' }} onClick={()=>navigate(`/waivers/${loanId}`)}><AiOutlineFullscreen/> MINIMIZE</button>
            </div>
            <Modal.Body>
              <Container>
                <Row style={{border:'15px solid #efefef'}}>
                        <h6 style={{backgroundColor:'#97bb61b3',padding:'8px 0 8px 8px'}}>Total Amount ${sessionStorage.getItem('amount')}</h6>
                      <Row>
                        <Col lg={4}><label htmlFor='approve'>Approved By *</label></Col>
                        <Col lg={8}><label htmlFor='reason'>Reason *</label></Col>
                      </Row>
                      <Row className='modalInput'>
                        <Col lg={4}><input type='text' id='approve' onChange={(e)=> setApprove(e.target.value)}/></Col>
                        <Col lg={8}><input type='text' id='reason' onChange={(e)=> setReason(e.target.value)}/></Col>
                      </Row>
                      <Row className='mt-2' style={{display:'flex', justifyContent:'space-between'}}>
                        <h5 style={{width:'50%'}}>Itemization</h5>
                        <button style={{alignItems:'center', background:'inherit', border:'none', width:'50%' ,paddingLeft:'18em' }}
                        onClick={() => addFormFields()}> 
                        ADD ITEMIZATION</button>
                      </Row>

        <form id='waiverForm' onSubmit={handleSubmit} style={{ display:'block', paddingBottom:'30px'}}>
          
              <Row style={{width:'100%'}}>
                <Col style={{width:'23.75%'}}><label>Applies To *</label></Col>
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
                    <button style={{border:'none', background:'inherit', paddingLeft:'15px'}} type="button"  className="button remove" onClick={() => removeFormFields(index)}><RiDeleteBin5Line/> Remove</button> 
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

export default WaiversFull