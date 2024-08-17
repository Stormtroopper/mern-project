import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma'
export default async function Home() {
  let product_list=await prisma.product.findMany({
    orderBy:{id:"desc"}
  })
  return (
    <>  

    <div>
    <h1 className="text-5xl text-center">My products </h1><br />
    <ProductCard  product={product_list[0]}></ProductCard>
    <div className='my-6 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-2'>
    {product_list.slice(1).map(product=>(
      <ProductCard product={product} key={product.id}/>
    ))}  
    </div>  
    </div>
    </>
    
  );
}
