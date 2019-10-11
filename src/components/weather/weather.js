import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';
import {
  Input,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardHeader,
  CardBody,
  Card,
  CardTitle } from 'reactstrap';

const cities = [
    { label: "London", value: "London" },
    { label: "Canada", value: "Canada" },
    { label: "Pune", value: "Pune" },
    { label: "Mumbai", value: "Mumbai" },
  ];
class Weather extends React.Component{
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      collapse : false,
      selectedCity: "",
      temperature: "-",
      pressure: "-",
      humidity: "-",
      forcastTemp: "-",
      description: "-",
      wind: "-"
    };
    this.toggle = this.toggle.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
  }

    async getWeatherData (){
      await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.selectedCity}&appid=cb7cd1a2e3583f0c3d07614dad2850c8`)
        .then(response => response.json())
        .then((data) => {
          this.setState({ 
            temperature: data.main.temp,
            pressure: data.main.pressure,
            humidity: data.main.humidity
          })
          console.log(data)
        })
  }

  async getForcastData(){
    await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.selectedCity}&appid=cb7cd1a2e3583f0c3d07614dad2850c8`)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        forcastTemp: data.list[0].main.temp,
        description: data.list[0].weather[0].description,
        wind : data.list[0].wind.deg  
      })
      console.log("Forcast:::::",data)
    })
  }
       

    handleChange = selectedCity => {
      this.setState({ 
        selectedCity : selectedCity.value 
      },function(){
        console.log(`Option selected:`,this.state.selectedCity);
        this.getWeatherData()
        this.getForcastData()
      });
      
    };

    toggle() {
      this.setState( state => ({ collapse: !state.collapse}))
    }
    toggleNavbar() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }

    goToLogin = (path) => {
      this.props.history.push(path);
    }
    render(){
        return (
        <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand style={{'color': 'aliceblue'}}>Weather Forcast</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login" style={{'color': 'aliceblue'}}>Logout</NavLink>
              </NavItem>
            </Nav>
            </Collapse>
          </Navbar>
              
 
            <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
              <h1>Select City</h1>
                <Select
                  value={this.state.selectedCity}
                  onChange={this.handleChange}
                  options={cities}
                />
              </div>
              <div className="col-md-4">
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-6">
              <Card>
              <CardHeader>Today's Weather for {this.state.selectedCity}</CardHeader>
                <CardBody>
                  <p>Temperature: {this.state.temperature} °F</p>
                  <p>Humidity: {this.state.humidity}</p>
                  <p>Pressure: {this.state.pressure}</p>
                </CardBody>
              </Card> 
              </div>
              <br/>
              <div className="col-md-6">
              <Card>
              <CardHeader>Forcast </CardHeader>
                <CardBody>
                  <p>Weather Forcast: {this.state.description}</p>
                  <p>Wind : {this.state.wind}</p>
                </CardBody>
              </Card> 
              </div>
            </div>
          </div>
          <NavLink color="primary" onClick={this.toggle} style={{ color:'blue', 'margin-left': '1000px',
          'padding-left': '550px'}}>About us</NavLink>
              <Collapse isOpen={this.state.collapse}>
              <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
              
                <Card style={{
                  'height': '394px',
                  'width': '235px'
                }}>
                <CardHeader>About Us</CardHeader>
                  <CardBody>
                    Anim pariatur cliche reprehenderit,
                   enim eiusmod high life accusamus terry richardson ad squid. Nihil
                   anim keffiyeh helvetica, craft beer labore wes anderson cred
                   nesciunt sapiente ea proident.
                  </CardBody>
                </Card>
                </div>
                </div>
              </Collapse>
          </div>
        );
    }
}

export default withRouter(Weather);
