import { Product } from "@prisma/client";
import PriceTag from "./PriceTag";
import Link from "next/link";
interface ProductProps{
    product:Product
}
export default function ProductCard({product}:ProductProps ){
    const isNew=Date.now() - new Date(product.createdAt).getTime()< 1000*60*60*24*7;
return(
    <>
    <div className="card bg-base-100 shadow-xl  border-t-violet-500">
  <figure><img src={product.imageUrl} alt={product.name} width={800} height={400} className="h-48 object-cover"/></figure>
  <div className="card-body">
    <h2 className="card-title">{product.name}</h2>
    {isNew && <div className="badge badge-success hover:cursor-pointer">Latest</div>}
    <p>{product.description}</p>
    <PriceTag price={product.price}/>
     <div className="card-actions justify-start">
      <Link href={"/products/"+product.id} className="btn btn-primary">Check it Out!</Link>
    </div> 
  </div>
</div>
    </>
)
}