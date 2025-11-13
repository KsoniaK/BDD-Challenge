import React from 'react';


class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           genre: []
        }
    }

    handleChange = (e) => {
        let target = e.target;
        this.setState({
            [target.name]: target.value
        })
    }

   
    componentDidMount(){
        fetch("http://localhost:3001/read/genre")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            this.setState({genre : data})
            
        })
    }


    render() {
        return (
            <div>
                     <h3>FILMS</h3>
                     <button onClick={() => {this.props.history.push("/Films")}}>Voir le contenu</button>
                     <h3>SERIES</h3>
                     <button onClick={() => {this.props.history.push("/Series")}}>Voir le contenu</button>
          
            </div>
        );
    }
}
export default Home;