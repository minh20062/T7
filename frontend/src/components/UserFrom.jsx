import { useState } from "react";


const UserFrom = ({onsubmit,currentUser}) =>{
    const [name,setName] = useState(currentUser ? currentUser.name: '');
    const [email,setEmail] = useState(currentUser ? currentUser.email: '');
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        onsubmit({id: currentUser ? currentUser.id: Date.now(),name,email});
        setName('');
        setEmail('');
    };

    return (
        <div className="bg-white p-4 shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">
                
            </h2>
        </div>
    )
}