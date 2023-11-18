import React from 'react'
import './contact.css';
import contactus from '../../assets/undraw_Agreement_re_d4dv.png'
const Contact = () => {
  return (
    <div className='contact'>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <img src={contactus} alt="contactus" className='img-fluid' />
          </div>
          <div className="col-md-6">
            <form id="contact_form" onSubmit={(e)=>e.preventDefault()}>
               <h1 className='text-center'>Contact us</h1>
              <div className="form-group">
                <label>Name</label>
                <input type="text" required maxLength="50" className="form-control" id="first_name" name="first_name" />
              </div>
              <div className="form-group">

                <label htmlFor="email_addr">Email address</label>
                <input type="email" className="form-control" id="email_addr" name="email" required
                  placeholder="name@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="tel" className="form-control" id="subject" name="Phone" required
                  placeholder="subject" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn w-100 contact_btn">Send Email</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact