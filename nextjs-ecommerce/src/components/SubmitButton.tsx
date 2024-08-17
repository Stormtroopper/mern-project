"use client"
import React, {ComponentProps} from 'react';
import {useFormStatus} from 'react-dom';
type FormSubmitButton={
children:React.ReactNode,
className?:string,
}& ComponentProps<"button">
export default function SubmitButton(
    {children,className,...props}:FormSubmitButton
){
    const {pending}=useFormStatus();
return(
    <button {...props} className={`btn btn-success ${className}`} type="submit" disabled={pending}>{pending && <span className="loading loading-infinity loading-lg"/> }{children}</button>
)
}