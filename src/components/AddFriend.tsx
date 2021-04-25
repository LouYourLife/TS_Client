import React, { useState } from "react";
import ILyndaFriend from "../interfaces/interfaces"
import { useMutation, gql } from '@apollo/client'

const ADD_FRIEND = gql`
mutation createFriend($friend:FriendInput) {
  createFriend(input:$friend) {
    firstName
    lastName
    password
    email
  }
}`

type AddFriendProps = {
  initialFriend?: ILyndaFriend
}

interface IKeyableFriend extends ILyndaFriend {
  [key: string]: any
}
const AddFriend = ({ initialFriend }: AddFriendProps) => {
  const EMPTY_FRIEND: ILyndaFriend = { firstName: "", lastName: "", email: "", password: "" }
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }
  const [friend, setFriend] = useState({ ...newFriend })

  const [addFriend, {data}] = useMutation(
    ADD_FRIEND,
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
    addFriend({
      variables:{friend:{...friend/* , age:Number(friend.age) */}}
    })
    setFriend({ ...EMPTY_FRIEND })
  }


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName <br />
        <input type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password <br />
          <input type="password" id="password" value={friend.password} onChange={handleChange}/>
      </label>
      <br />
      <label>
        Email <br />
        <input type="text" id="email" value={friend.email} onChange={handleChange} />
      </label>
      <br /><br />
      <input type="submit" value="Save Friend" />
    </form>
    <div>
      {JSON.stringify({friend})}
      {data && <p>{JSON.stringify({data})}</p>}
    </div>
    </div>
  );
}

export default AddFriend;