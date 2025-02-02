import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, updateUserAsync } from "../features/auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { discountedPrice } from "../app/constants";

// const addresses = [
//   {
//     name: "Sakata Gintoki",
//     street: "yorozuya 12th",
//     city: "kabukicho",
//     prefecture: "Tokyo",
//     pinCode: 25454,
//     phone: 8462876423,
//   },
//   {
//     name: "Senjougahara Hitagi",
//     street: "kyoto jo street",
//     city: "kyoto",
//     prefecture: "kansai",
//     pinCode: 24343,
//     phone: 9856356352,
//   },
//   {
//     name: "Kurosaki Ichigo",
//     street: "Town road",
//     city: "Karakura",
//     prefecture: "Tokyo",
//     pinCode: 25454,
//     phone: 8462876423,
//   },
// ];

function Checkout() {
  const dispatch = useDispatch();
  const items=useSelector(selectItems)
  const currentOrder=useSelector(selectCurrentOrder)
  const totalAmount=items.reduce((amount,item)=>discountedPrice(item)*item.quantity+amount,0)
  const totalItems=items.reduce((total,item)=>item.quantity+total,0)

  const [selectedAddress,setSelectedAddress]=useState(null)
  const [paymentMethod,setPaymentMethod]=useState('cash')

  const user=useSelector(selectUserInfo)

  const handleQuantity=(e,item)=>{
    dispatch(updateCartAsync({...item,quantity:+e.target.value}))
  }

  const handleRemove=(e,itemId)=>{
    dispatch(deleteItemFromCartAsync(itemId))
  }

  const handleAddress=(e)=>{
    console.log(e.target.value)
    setSelectedAddress(user.addresses[e.target.value])
  }

  const handlePayment=(e)=>{
    console.log(e.target.value)
    setPaymentMethod(e.target.value)
  }

  const handleOrder=(e)=>{
    const order={items,user,totalAmount,totalItems,selectedAddress,paymentMethod,status:'Pending'} //other statuses:Delivered,Received
    dispatch(createOrderAsync(order))
    //TODO:redirect to order success page
    //TODO:on server change the stock available
    //TODO:clear cart after ordering
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <>
    {!items.length&& <Navigate to='/' replace={true}></Navigate>}
    {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form className="bg-white px-5 py-3 mt-12"
          noValidate
          onSubmit={handleSubmit((data)=>{
            console.log(data)
            dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}))
            reset()
          })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl py-12 font-semibold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        {...register('name',{required:'name is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('email',{required:'email is required'})}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                    <input
                        id="phone"
                        {...register('phone',{required:'phone number is required'})}
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        {...register('street',{required:'Street address is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        {...register('city',{required:'City is required'})}
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      State
                    </label>
                    <div className="mt-2">
                      <input
                        id="state"
                        {...register('state',{required:'State is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Pin Code
                    </label>
                    <div className="mt-2">
                      <input
                        id="pinCode"
                        {...register('pinCode',{required:'Pin Code is required'})}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add address
              </button>
            </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Choose from existing addresses
                </p>
                <ul role="list">
                  {user.addresses.map((address,index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <input
                          name="address"
                          onChange={handleAddress}
                          type="radio"
                          value={index}
                          className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm/6 font-semibold text-gray-900">
                            {address.name}
                          </p>
                          <p className="text-sm/6 font-semibold text-gray-900">
                            {address.phone}
                          </p>
                          <p className="mt-1 truncate text-xs/5 text-gray-500">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm/6 text-gray-900">
                          {address.city}
                        </p>
                        <p className="text-sm/6 text-gray-900">
                          {address.state}
                        </p>
                        <p className="text-sm/6 text-gray-500">
                          {address.street}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm/6 font-semibold text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm/6 text-gray-600">Choose One</p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          onChange={handlePayment}
                          value='cash'
                          type="radio"
                          checked={paymentMethod==='cash'}
                          className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payments"
                          onChange={handlePayment}
                          value='card'
                          type="radio"
                          checked={paymentMethod==='card'}
                          className="size-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            
          </form>
        </div>
        <div className="lg:col-span-2">
        <div className="mx-auto max-w-7xl mt-12 bg-white px-2 sm:px-2 lg:px-4">
        <div className="border-t border-gray-200  px-0 py-6 sm:px-0 ">
          <h1 className="text-4xl font-bold my-5 tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={item.title}
                      src={item.thumbnail}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm/6 font-medium text-gray-900"
                        >
                          Qty
                        </label>
                        <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={e=>handleRemove(e,item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Items In Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <div
              onClick={handleOrder}
              className="flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Order Now
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to='/'>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;
