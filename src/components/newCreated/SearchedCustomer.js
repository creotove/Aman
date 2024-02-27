import { useNavigate } from "react-router-dom"

const SearchedCustomer = ({name,phoneNumber,avatar,customerId}) => {
  const navigate = useNavigate()
  return (
    <div className="mt-5 smallContainer radius"  onClick={(e)=>{
      e.preventDefault()
      e.stopPropagation()
    }}>
     <div className="md:grid-cols-12 grid gap-4 mt-5 ">
        <div className="slot smallContainer radius md:col-span-4 flex items-center">
          <div className="">
            <div className="h-24 w-24 bg-white rounded-full overflow-hidden text-black text-3xl">
              <img src={avatar} alt={name.charAt(0)} />
            </div>
          </div>
          <div className="ms-20">
            <div className=""><h6 className="headerText">{name}</h6></div>
            <div className=""><h6 className="headerText">{phoneNumber}</h6></div>
          </div>
        </div>
        {/* <div className="slot smallContainer radius md:col-span-4">
          <div>
            <p className="subText">Recenet Bills</p>
            <p>okiee</p>
          </div>
        </div> */}
      </div>
        <div className="w-full mt-4 text-end">
        <button className="myBtn" onClick={(e)=>{
          e.preventDefault()
          e.stopPropagation()
          navigate(`/customers/${customerId}`, { state: { id: customerId } })
        }}>View Profile</button>
        </div>
    </div>
    
  )
}

export default SearchedCustomer