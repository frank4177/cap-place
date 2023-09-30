
interface IbuttonProp{
  handleClick?: ()=> void;
  title?: string
}

const Button = ({handleClick, title} :IbuttonProp) => {
  return (
    <>
    <button className='bg-bgGreen h-[30px] w-[50px] text-[13px] text-white rounded-[2px]' onClick={()=> handleClick?.()}>
        {title ? title : "Save"}
    </button>
    </>
  )
}

export default Button