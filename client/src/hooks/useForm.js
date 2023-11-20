import { useState } from "react"

export default function useForm(initialValues, submitHandler){
    const [formValues, setFormValues] = useState(initialValues, true)
    
    const onChange = (e) =>{
        setFormValues(state =>({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        submitHandler(values)
    }

    return{
        values, onChange, onSubmit
    }
}