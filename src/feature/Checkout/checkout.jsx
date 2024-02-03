import { useState, useEffect } from "react";
import "./checkout.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { cartItemSelector } from "../../store/slices/cartSlice";
import Swal from 'sweetalert2'
import { useSelector } from "react-redux";
const Checkout = () => {
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [val, setVal] = useState({
        cardnumber: "",
        cvc: "",
        expMonth: "",
        expYear: "",
        name: "",
        address:""
    });

    const cartItem = cartItemSelector();
    const [Total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [GTotal, setGTotal] = useState(0);

    const GetGrandTotal = () => {
        let calculation = cartItem.reduce((acc, curr) => {
            acc.total += Number((curr.item.card.info.price? curr.item.card.info.price/ 100:curr.item.card.info.defaultPrice/ 100)) * Number(curr.quantity);

            acc.totalQuantity += curr.quantity
            return acc;
        }, { total: 0, totalQuantity: 0 })

        const disc = parseFloat(calculation.total * 10 / 100).toFixed(2);
        setDiscount(disc);

        const GtotalAmt = calculation.total + 60 - disc;
        setTotal(calculation.total);
        setTotalQuantity(calculation.totalQuantity);
        setGTotal(GtotalAmt);
    }

    useEffect(() => {
        GetGrandTotal();
    }, [cartItem]);


    const checkValidation = () => {
        const error = {};
        const numberRegex = /^\d+$/;
        if (!val.cardnumber) {
            error.cardnumber = "card number is required"
        } else if (!numberRegex.test(val.cardnumber)) {
            error.cardnumber = "enter valid card number"
        }

        if (!val.name) {
            error.name = "card name is required"
        }
        if (!val.cvc) {
            error.cvc = "cvc is required"
        } else if (!numberRegex.test(val.cvc)) {
            error.cvc = "enter valid cvc"
        }
        if (!val.expMonth) {
            error.expMonth = "Month is required"
        } else if (!numberRegex.test(val.expMonth)) {
            error.expMonth = "enter valid Month"
        } else if (!(val.expMonth <= 12 && val.expMonth > 0)) {
            error.expMonth = "enter valid Month"
        }

        if (!val.expYear) {
            error.expYear = "Year is required"
        } else if (!numberRegex.test(val.expYear)) {
            error.expYear = "enter valid Year"
        }

        if (!val.address) {
            error.address = "address is required"
        }
        return error;
    }

    const InputchangeHandler = (event) => {
        setVal((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        });
    };
    const submithandler = (e) => {
        e.preventDefault();
        const checkerror = checkValidation();
       
        if (Object.keys(checkerror).length > 0) {
            setError(checkerror);
        } else {
            setError({});

            Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes!"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Thank You!",
                  text: "your order placed sucessfully",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500
                }).then(()=>{
                    navigate("/",{replace:true});
                });

                
              }
            });

        }
        // if (!(val.cardnumber && val.cvc && val.expiry && val.name)) {
        //     alert('Please fill all the field');
        //     return;
        // }
        // toast.success('Thank You😊 Your order placed successsfully!');
        // setTimeout(()=>{
        //     dispatch(clearCart());
        //     navigate("/")
        // },2000);
    };
    return (
        <>
            <section className="bg-light my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card shadow-0 border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h4 className="mb-3 summery_title">Order Summery</h4>

                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Price ({totalQuantity} items)</p>
                                        <p className="mb-2">₹ {Total.toFixed(2)} </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Discount (10%)</p>
                                        <p className="mb-2 text-success">₹ {discount}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Delivery charges</p>
                                        <p className="mb-2">₹ 60.00</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="mb-2 save-message">You'll save ₹ {discount} on this order 🎉</p>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total Amount:</p>
                                        <p className="mb-2 fw-bold">₹ {GTotal.toFixed(2)}</p>
                                    </div>

                                    <div className="mt-3">
                                        <Link to={"/cart"} className="btn btn-checkout w-100 shadow-0 mb-2">BACK TO CART</Link>
                                        <Link to={"/"} className="btn btn-light w-100 border mt-2"> Back to Home </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 checkout">
                            <div className="card border shadow-0">
                                <div className="m-4">
                                    {/* <h4 className="card-title mb-4">Your FoodItem cart</h4> */}
                                    <div className="row gy-3">
                                        <div className="col-lg-12">
                                            <div className="me-lg-2">
                                                <form onSubmit={submithandler}>
                                                    <div className="form-row">
                                                        <div className="col-xs-12 form-group">
                                                            <label className="control-label mb-1">
                                                                Name on Card
                                                            </label>
                                                            <input
                                                                className="form-control mb-1"
                                                                size="4"
                                                                type="text"
                                                                value={val.name}
                                                                name="name"
                                                                onChange={InputchangeHandler}
                                                            />
                                                            {error?.name && <p className="error">{error?.name}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row mb-2">
                                                        <div className="col-xs-12 form-group">
                                                            <label className="control-label">
                                                                Card Number
                                                            </label>
                                                            <input
                                                                autoComplete="off"
                                                                className="form-control card-number mb-1"
                                                                maxLength={"20"}
                                                                type="text"
                                                                value={val.cardnumber} name='cardnumber' onChange={InputchangeHandler}
                                                            />
                                                            {error.cardnumber && <p className="error">{error?.cardnumber}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-xs-4 form-group cvc">
                                                            <label className="control-label">CVC</label>
                                                            <input
                                                                autoComplete="off"
                                                                className="form-control card-cvc mb-1"
                                                                placeholder="ex. 311"
                                                                maxLength={"4"}
                                                                type="text"
                                                                value={val.cvc} name='cvc' onChange={InputchangeHandler}
                                                            />
                                                            {error?.cvc && <p className="error">{error?.cvc}</p>}
                                                        </div>
                                                        <div className="col-xs-4 form-group expiration">
                                                            <label className="control-label mb-1">
                                                                Expiration Month
                                                            </label>
                                                            <input
                                                                className="form-control card-expiry-month mb-1"
                                                                placeholder="MM"
                                                                maxLength={"2"}
                                                                type="text"
                                                                value={val.expMonth} name='expMonth' onChange={InputchangeHandler}
                                                            />
                                                            {error?.expMonth && <p className="error">{error?.expMonth}</p>}
                                                        </div>
                                                        <div className="col-xs-4 form-group expiration">
                                                            <label className="control-label mb-1">
                                                                Expiration Year
                                                            </label>
                                                            <input
                                                                className="form-control card-expiry-year mb-1"
                                                                placeholder="YYYY"
                                                                maxLength={"4"}
                                                                type="text"
                                                                value={val.expYear} name='expYear' onChange={InputchangeHandler}
                                                            />
                                                            {error?.expYear && <p className="error">{error?.expYear}</p>}
                                                        </div>

                                                        <div className="col-xs-4 form-group expiration">
                                                            <label className="control-label mb-1">
                                                                Delivery Address
                                                            </label>
                                                            <input
                                                                className="form-control card-expiry-year mb-1"
                                                                placeholder="delivery address"
                                                                type="text"
                                                                value={val.address} name='address' onChange={InputchangeHandler}
                                                            />
                                                            {error?.address && <p className="error">{error?.address}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-12 mb-2 mt-3">
                                                            <div className="form-control total btn btn-info">
                                                                Total:
                                                                <span className="amount">₹ {GTotal.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-12 form-group mb-2">
                                                            <button
                                                                className="form-control btn btn-primary submit-button"
                                                                type="submit"
                                                            >
                                                                Pay »
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    );
};
export default Checkout;
