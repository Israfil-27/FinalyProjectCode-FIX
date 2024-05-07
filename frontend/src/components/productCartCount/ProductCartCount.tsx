import { Col } from 'antd'
import { useState } from 'react'

const ProductCartCount = ({product}:any) => {
    const [qty,setQty] = useState(1)
    
    const handleQtySum: () => void = () => {
      setQty(qty + 1)
    };
    const handleQtySubtraction:() => void = () => {
     setQty(qty - 1)
    };
  return (
    <Col className="qty-child">
    <div className="qty-input-container">
    <button onClick={handleQtySum} disabled={qty >= product.countInStock}>+</button>
    <input style={{width:"50px"}} max={product.countInStock} min={0} className="qty-input" onChange={(e)=>setQty(parseInt(e.target.value))} value={product.count}/>
    <button onClick={handleQtySubtraction} disabled={qty === 0}>-</button>
    </div>
    </Col>
  )
}

export default ProductCartCount
