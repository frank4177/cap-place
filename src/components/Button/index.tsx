
interface IbuttonProp{
  handleClick?: ()=> void
}

const Button = ({handleClick} :IbuttonProp) => {
  return (
    <>
    <button className='bg-bgGreen h-[30px] w-[50px] text-[13px] text-white rounded-[2px]' onClick={()=> handleClick?.()}>
        Save
    </button>
    </>
  )
}

export default Button