import React from 'react';
import axios from 'axios';
import './App.css';
import UserCard from "./Components/Usercard"

class App extends React.Component {
  constructor() {
    console.log ("constructor running");
    super();
    this.state={
      user= [],
      followers= [],
    };
  }

    componentDidMount(){
      axios
        .get(`https://api.github.com/users/drcrystalm`)
        
        .then((res)=> {
          console.log(res)
          this.setState({
            name: res.data.name,
            user: res.data.login,
            bio: res.data.bio,
            company: res.data.company,
            location: res.data.location,
            followers: res.data.followers,
          })
        })

        .catch(res)((err)=> console.log(err, "No bueno!"))      
   

      axios
        .get(`https://api.github.com/users/drcrystalm/followers`)

        .then((res)=> {
          console.log(res.data, "From second axios call")
          this.setState({
            followers: res.data,
          })
        })

        .catch((err)=> console.log(err, "Error from componentDidUpdate"))
    }

    render(){
      console.log(this.state)
      return(
        <div>
          <UserCard
            name={this.state.name}
            bio={this.state.bio}
            location={this.state.location}
            company={this.state.company}
            user={this.state.user}
            followers={this.state.followers}
          />

          {this.state.followers.map(followers =>(
            <h1>Name: followers.name</h1>
          ))}

        </div>
      )
    }
}

export default App;
