import React, { useState } from 'react'
import { useQuery,gql, useLazyQuery, useMutation } from "@apollo/client";
const  QUERY_ALL_USERS = gql`
    query GetAllUsers{
        users{
            id
            name
            username
            age
        }
    }

`;
const GET_MOVIES = gql`
    query getMovies{
        movies{
            name
            yearOfPublication
        }
    }`;
const GET_MOVIE_BY_NAME = gql`
query Movie($name:String!){
    movie(name: $name){
        name
        yearOfPublication
    }
        
}`;

const CREATE_USER_MUTATION=gql`
mutation createUser($input: createUserInput!){
    createUser(input: $input) {
      name
      username
    }
}
`

function DisplayData() {
//movie
    const [movieSearched, setMovieSearched] = useState("");
    
//user
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [nationality  , setNationality] = useState("");

//queries
    const {data, loading, error, refetch} = useQuery(QUERY_ALL_USERS);
    const {data:movieData,error:movieError} = useQuery(GET_MOVIES);
    const [fetchMovies,{ data:movieSearchedData, error:movieSearchedError}] = useLazyQuery(GET_MOVIE_BY_NAME );

//mutation
const [createUser, {data:createUserData}] = useMutation(CREATE_USER_MUTATION);

    if(movieSearchedError){
        console.log(movieSearchedError.message);
    }
    
    if(movieData){
        console.log(movieData);
    }
    if(movieError){
        console.log(movieError);
    }
    if(loading){
        return <h1>Data is loading....</h1>
    }
    if (data) {
        console.log(data);
    }
  return (
    <div>
        <div >
            <input type='text'placeholder='name..' onChange={(event)=>{setName(event.target.value)}}/>
            <input type='text'placeholder='Username..' onChange={(event)=>{setUsername(event.target.value)}}/>
            <input type='number' min={0} max={100}placeholder='Age..' onChange={(event)=>{setAge(event.target.value)}}/>
            <input type='text'placeholder='Nationality..' onChange={(event)=>{setNationality(event.target.value)}}/>
            <button onClick={()=>{
                //add validation here
                createUser({
                    variables:{
                        "input": {
                            "name":name,
                            "username":username,
                            "age":Number(age),
                            "nationality":nationality
                        
                          }
                        }
                });
                refetch();
            }} >Add User</button>

        </div>

        <ol>
        {data && data.users.map((user)=>{
            return (
                <div>
                    <li>Name: {user.name}, username: {user.username}, age:{user.age}</li>
                    
                </div>
            )
        })}
        </ol>
        
        <ol>
        {movieData && movieData.movies.map((user)=>{
            return (
                <div>
                    <li>Name: {user.name}, username: {user.username}, age:{user.age}</li>
                    
                </div>
            )
        })}
        </ol>
        <div>
            <input placeholder="movies name" onChange={(event)=>{setMovieSearched(event.target.value)}}></input>
            <button onClick={()=>{
                fetchMovies({
                    variables:{
                        name:movieSearched.toLowerCase()
                    }
                })
            }}>Fetch movies</button>
            <div>
                
            {movieSearchedError && <div>{movieSearchedError.message}</div>}
                {movieSearchedData && (<div><h1>Movie Name: {movieSearchedData.movie.name}</h1>
                <h3>Movie year: {movieSearchedData.movie.yearOfPublication}</h3>
                </div>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default DisplayData