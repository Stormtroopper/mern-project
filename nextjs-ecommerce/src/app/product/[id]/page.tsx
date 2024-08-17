import Not_Found from '@/app/not-found'
import PriceTag from '@/components/PriceTag'
import prisma from '@/lib/db/prisma'
interface PageProps{
    params:{
        id:string
    }
}
export default async function ProductPage({params:{id}}:PageProps) {
    const product_page=await prisma.product.findUnique({where:{id}})
    if(!product_page) Not_Found();
    else{
        return(
            <div className='flex flex-col lg:flex-row gap-4 lg:items-center bg-gray-300 rounded-lg'>
                <img src={product_page.imageUrl} alt={product_page.name} width={450} height={450} className="rounded-lg h-50 w-50" /><br />
                <div>
                    <h1 className='text-7xl font-bold'>{product_page.name}</h1>
                    <PriceTag price={product_page.price} className='mt-3'/>
                    <p className='py-6'>{product_page.description}</p>
                </div>
            </div>
        )
    }
}