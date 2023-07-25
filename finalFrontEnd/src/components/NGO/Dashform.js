import React from 'react'
import data from '../datagp.js'
import { useState } from 'react';
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import './dash.css'


const Dashform = () => {
  const [data1,setData1]=useState(data);
  const [submitted,setSubmitted]=useState(false);
  const navigate=useNavigate();
  const[formData,setFormData]=useState({
    gp:"",category:""
})

  

function changeHandler(event)
{
    setFormData((prevData)=>(
        {
            ...prevData,
            [event.target.name]:(event.target.value)
        }
           
    ))
    
};
console.log(formData);
function submitHandler(event)
    {
        event.preventDefault();
        setSubmitted(true);
        
    }

  return (
    
   
    <div className="outer0">


         <div id="heading0"><div id="inheading0">DASHBOARD</div></div>
         <form onSubmit={submitHandler} >
            <label>
                <p className="label0">Select the GramPanchayat from the dropdown below::</p>
                <div className="outselection0">
                 <select className="selection0" required name='gp' value={formData.gp}  onChange={changeHandler} >
                    <option  disabled selected>
                        Select Gram Panchayat
                    </option >
                    {
                            data1.map( (dat) => (
                            
                                <option className="text-black">
                                    {dat.id}
                                </option>
                             ) )
                        }
                
                    
                    
                 </select>
                </div>
                
            </label>
            <label>
                <p className="label0">Select what you want to see:</p>
                <p className="label0"><span>1.</span>Issues  <span>2.</span>Water CheckUp data</p>
                <div className="outselection0">
                   <select className="selection0" required name='category' value={formData.category}  onChange={changeHandler} >
                        <option  disabled selected>
                                Select category
                        </option>
                        <option className='text-black'>
                            Issues
                        </option>
                        <option  className="text-black">
                            Checkup Data 
                        </option>
                    </select>
                </div>
                
                
            </label>
            <div className='outselection0'>
                <button>Submit</button>
            </div>
            
         </form>
         




         {formData.category=="Issues" && <div className="top0">The following issues need to be resolved ASAP:</div>}

         {
            
            data1.map( (inner) => (
                     <div>
                        
                       {(inner.id==formData.gp)&&inner.issues && (formData.category=="Issues")&&submitted&&
                       <div>
                       {

                          inner.issues.map((issue)=>(
                            <div className="card0">
                              {/* <div>-----------------------------------------------------------</div> */}
                              <div className="incard0">
                                  <p className='underline0'>Scheme No:</p>
                                  <div>{issue.schemeno}</div>
                              </div>
                              <div className="incard0">
                                  <p className='underline0'>Village:</p>
                                  <div>{issue.villagename}</div>
                              </div>
                              <div className="incard0">
                                  <p className='underline0'>Problem:</p>
                                  <div>{issue.problem}</div>
                              </div>
                            </div>))
                        }
                        </div>}
                    </div>))
                        
         }
              
         




        {formData.category=="Checkup Data" && <div className="top0">The water reports are as follows:</div>}

        {
   
            data1.map( (inner) => (
                <div>
               
                      {(inner.id==formData.gp)&& inner.checkdata && (formData.category=="Checkup Data")&&submitted&&
                <div>
       
                {
           
             
                 inner.checkdata.map((stats)=>(
                   <div className="card0">
                      {/* <div>-----------------------------------------------------------</div> */}
                      <div className="incard0">
                          <p className='underline0'>Chlorine Level:</p>
                          <div>{stats.chlorinelevel}</div>
                      </div>
                      <div className="incard0">
                         <p className='underline0'>Iron Level:</p>
                         <div>{stats.ironlevel}</div>
                      </div>
                      <div className="incard0">
                          <p className='underline0'>Zinc Level:</p>
                          <div>{stats.zinclevel}</div>
                       </div>
                       <div className="incard0">
                           <p className='underline0'>Sodium Level:</p>
                           <div>{stats.sodiumlevel}</div>
                      </div>
                      <div className="incard0">
                          <p className='underline0'>Magnesium Level:</p>
                          <div>{stats.magnesiumlevel}</div>
                      </div>
                      <div className="incard0">
                          <p className='underline0'>Calcium Level:</p>
                          <div>{stats.calciumlevel}</div>
                      </div>
                    </div>))
                } 
                </div>}
            </div>))
            
        }
    </div>
  )
}
export default Dashform

