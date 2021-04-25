import React, { useState } from "react";
import ILyndaFriend, { IChangeFriend } from "../interfaces/interfaces"
import { useMutation, gql } from '@apollo/client'

const CHANGE_FRIEND = gql`
mutation editFriend($friend:FriendEditInput){
    editFriend(input: $friend)
    {
      firstName
      lastName
      password
      email
    }
  }
`

type ChangeFriendProps = {
    initialFriend?: IChangeFriend
}

interface IKeyableFriend extends IChangeFriend {
    [key: string]: any
}

const ChangeFriend = ({ initialFriend }: ChangeFriendProps) => {
    const EMPTY_FRIEND: IChangeFriend = {firstName:"", lastName:"", email:"", password:""}
    let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }
    const [friend, setFriend] = useState({ ...newFriend });

    const [editFriend, {data}] = useMutation(
        CHANGE_FRIEND,
        {}
    )

    const handleChange = (event: any) => {
        const id = event.currentTarget.id;
        let friendToChange: IKeyableFriend = { ...friend }
        friendToChange[id] = event.currentTarget.value;
        setFriend({ ...friendToChange })
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //alert(JSON.stringify(friend))
        editFriend({
            variables: {friend: { ...friend }}
        })
        setFriend({ ...EMPTY_FRIEND })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Firstname<br/>
                    <input type="text" id="firstName" value={friend.firstName} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Lastname<br/>
                    <input type="text" id="lastName" value={friend.lastName} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Password<br/>
                    <input type="text" id="password" value={friend.password} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Email<br/>
                    <input type="text" id="email" value={friend.email} onChange={handleChange}/>
                </label>
                <br/><br/>
                <input type="submit" value="Edit Friend"/>
            </form>
            <div>
                {JSON.stringify({friend})}
                {data && <p>{JSON.stringify({data})}</p>}
            </div>
        </div>
    )
    
}

export default ChangeFriend;