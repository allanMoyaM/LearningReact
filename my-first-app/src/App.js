import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
state = {
  persons: [
    {id: '1', name: 'Allan', age: 26}
  ],
  showPersons: false,
}



switchNameHandler = (newName) => {
  this.setState({
    persons: [
      {name: newName, age: 26}
    ]
  })
}

deletePersonHandler = (personIndex) =>{
  //const persons = this.state.persons.slice();
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});  
}

nameChangedHandler = (event, id) =>{
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });

  const person = {
    ...this.state.persons[personIndex]
  }

  person.name = event.target.value;

  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState ( {persons: persons} )
}

togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow});
}

  render() {

    let persons = null;
    let btnClass = '';
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click = {() => this.deletePersonHandler(index)}
              name = {person.name}
              age = {person.age}
              key = {person.id}
              changed = {(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
          
        </div>
      );
      btnClass = classes.red;
    }

    let assignedClasses = [];
    
    if(this.state.persons.length <= 1){
      assignedClasses.push('red');
      assignedClasses.push('bold');// classes = ['red',bold']
    }


    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button 
        className={classes.App}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null, 'Does this work now?'));
  }
}

export default App;