import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import {withRouter} from 'react-router-dom';

 class Login extends React.Component {
     constructor(props){
         super(props);
         this.state = {
             email : "",
             password : ""
         }
     }

     onChangeMethod = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
        

    onSubmit = (path) => {
        console.log(this.state);
        this.props.history.push(path);
    }

  render() {
    return (
    <div>
    <Card style={{
        'justify-content': 'center',
        'align-items': 'center',
        'flex-direction': 'column',
        'padding-top': '200px',
        'background-color': 'darkslategray'
    }}>
    <CardBody>
    <h2>Please Login</h2>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input 
            style= {{width: 'auto'}}
            type="email" 
            name="email" 
            placeholder="with a placeholder" 
            value={this.state.email}
            onChange={e => this.onChangeMethod(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input 
            style= {{width: 'auto'}}
            type="password" 
            name="password"  
            placeholder="password placeholder" 
            value={this.state.password}
            onChange={e => this.onChangeMethod(e)} />
        </FormGroup>
        <Button onClick = {() => this.onSubmit('/weather')} color="primary">Submit</Button>
      </Form>
      </CardBody>
      </Card>
      </div>
    );
  }
}

export default withRouter(Login);

