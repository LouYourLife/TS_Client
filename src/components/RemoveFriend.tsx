import React, { useState } from "react";
import ILyndaFriend from "../interfaces/interfaces"
import { useMutation, gql } from '@apollo/client'

const REMOVE_FRIEND = gql`
mutation deleteFriend($email:String){
    deleteFriend(input: $email)
    {
      firstName
      lastName
      email
    }
  }
`

const RemoveFriend = () => {
    const [email, setEmail] = useState("");

    const [deleteFriend, {data}] = useMutation(
        REMOVE_FRIEND,
        {}
    )

    const handleChange = (event: any) => {
        setEmail(event.currentTarget.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //alert(JSON.stringify(email))
        deleteFriend({variables:{email}})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email<br/>
                    <input type="text" id="email" value={email} onChange={handleChange}/>
                </label>
                <br/><br/>
                <input type="submit" value="Delete Friend"/>
            </form>
            <div>
                {JSON.stringify({email})}
                {data && <p>{JSON.stringify({data})}</p>}
            </div>
        </div>
    )
}

export default RemoveFriend;