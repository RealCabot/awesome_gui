import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import range from 'lodash.range';
import Grid from 'material-ui/Grid';
import {monitorSensors, monitorPID} from './api.js'

const PlotlyComponent = createPlotlyComponent(Plotly);

class Plotter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ultrasonic: [],
            infrad: [],
            pot: [],
            force: [],
            input: [],
            control: []
        };
        this.updateData = this.updateData.bind(this);
        this.updatePID = this.updatePID.bind(this);        
        monitorSensors(this.updateData);
        monitorPID(this.updatePID);
    }

    updateData({ultrasonic, infrad, pot, force}) {
      this.setState(prevState => {
        return {
          ultrasonic: [...prevState.ultrasonic, ultrasonic],
          infrad: [...prevState.infrad, infrad],
          pot: [...prevState.pot, pot],
          force: [...prevState.force, force]
        };
      });
    }

    updatePID({input, control}){
      console.log("New PID data");
      this.setState(prevState => {
        return {
          input: [...prevState.input, input],
          control: [...prevState.control, control],
        };
      });
    }

    render() {
        let ultrasonic_data = [{
            type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            x: range(50),     // more about "x": #scatter-x
            y: this.state.ultrasonic.slice(-50),     // #scatter-y
            mode: 'lines',
            name: 'Ultrasonic sensor',
            line: {shape: 'spline'}
          }];
        let infrad_data = [{
            type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            x: range(50),     // more about "x": #scatter-x
            y: this.state.infrad.slice(-50),     // #scatter-y
            mode: 'lines',
            name: 'Infrad sensor',
            line: {shape: 'spline'}            
          }];
        let pot_data = [{
            type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            x: range(50),     // more about "x": #scatter-x
            y: this.state.pot.slice(-50),     // #scatter-y
            mode: 'lines',
            name: 'Pot sensor',
            line: {shape: 'spline'}            
          }];
        let force_data = [{
            type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            x: range(50),     // more about "x": #scatter-x
            y: this.state.force.slice(-50),     // #scatter-y
            mode: 'lines',
            name: 'Force sensor',
            line: {shape: 'spline'}            
          }];
        let pid_data = [{
            type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            x: range(50),     // more about "x": #scatter-x
            y: this.state.input.slice(-50),     // #scatter-y
            mode: 'lines',
            name: 'Input',
            line: {shape: 'spline'}
          }, {
          type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
          x: range(50),     // more about "x": #scatter-x
          y: this.state.control.slice(-50),     // #scatter-y
          mode: 'lines',
          name: 'Control',
          line: {shape: 'spline'}
          }
        ];
        let config = {
          showLink: false,
          displayModeBar: true
        };
        return (
          <div>
            <PlotlyComponent data={pid_data} layout={{title: "PID data"}} config={config}/>
            <Grid container spacing={16}>
              <Grid item xs={12} md>
                <PlotlyComponent data={ultrasonic_data} layout={{title: "Ultrasonic Sensor"}} config={config}/>
              </Grid>
              <Grid item xs={12} md>
                <PlotlyComponent data={infrad_data} layout={{title: "Infrared Sensor"}} config={config}/>
              </Grid>
              <Grid item xs={12} md>
                <PlotlyComponent data={pot_data} layout={{title: "Potentiometer", yaxis: {range: [0, 1023]}}} config={config}/>
              </Grid>
              <Grid item xs={12} md>
                <PlotlyComponent data={force_data} layout={{title: "Force Sensor", yaxis: {range: [0, 1023]}}} config={config}/>
              </Grid>
            </Grid>
          </div>
        );
      }
}

export default Plotter;