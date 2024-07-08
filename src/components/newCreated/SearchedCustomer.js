import { useNavigate } from "react-router-dom"

const SearchedCustomer = ({ name, phoneNumber, avatar, customerId }) => {
  const navigate = useNavigate()
  return (
    <div className="smallContainer radius relative" onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
    }}>
      <div className="md:grid-cols-12 grid gap-4">
        <div className="slot smallContainer radius md:col-span-12 flex items-center justify-between">
          <div className="flex justify-center items-center">
            <div className="h-20 w-20 bg-white rounded-full overflow-hidden text-black text-3xl">
              <img src={avatar} alt={name.charAt(0)} />
            </div>
            <div className="ms-20">
              <div className=""><h6 className="headerText">{name}</h6></div>
              <div className=""><h6 className="headerText">{phoneNumber}</h6></div>
            </div>
          </div>
          <div className="whitespace-nowrap justify-center items-center flex">
            <button className="myBtn" onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigate(`/customers/${customerId}`, { state: { id: customerId } })
            }}>View Profile</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SearchedCustomer