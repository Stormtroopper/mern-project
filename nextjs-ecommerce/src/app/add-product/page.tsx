import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
export const metadata={
    title:"Add a Product-DemoZon"
}
async function addProduct(formData:FormData){
"use server";
const name=formData.get("name")?.toString();
const description=formData.get("description")?.toString();
const imageUrl=formData.get("imageUrl")?.toString();
const price=Number(formData.get("price")||0);
if(!name||!description||!imageUrl||!price){
    throw Error('Missing fields required');
}
await prisma.product.create({
   data:{
    name,description,imageUrl,price
   },
});
redirect("/");
}
export default function adding_product(){
return(
<>

    <div>
        <h1 className="text-lg text-center mb-3 mt-3 font-bold">Add a Product</h1>
        <form action={addProduct}>
            <input type="text" required className="me-3 input input-bordered w-full  text-center mx-auto"  placeholder="enter your product" name="name"/><br /><br />
            <textarea className="textarea textarea-bordered w-full mb-3 text-center" placeholder="description" name="description"></textarea>
            <input type="url" required className="me-3 input input-bordered w-full text-center mx-auto"  placeholder="enter the image" name="imageUrl"/><br /><br />
            <input type="number" required className="me-3 input input-bordered w-full  text-center mx-auto"  placeholder="enter the price" name="price"/><br /><br />
            {/* <button className="btn btn-warning btn-block">Add Product</button> */}
            <SubmitButton className="btn-block">Add Product</SubmitButton>
        </form>
    </div>
</>
)
}