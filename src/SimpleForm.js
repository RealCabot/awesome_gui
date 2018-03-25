import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
      })
  });

class SimpleForm extends Component {
    constructor(props) {
        super(props);
        let initialState = {}
        for (let field of props.fields){
            initialState[field.name] = ''
        }
        this.state = initialState;
        // This binding is necessary to make `this` work in the callback
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSend(){
        this.props.handleSend(this.state);
    }

    render() {
        const { classes } = this.props;
        const textFields = this.props.fields.map(f =>
            <Grid item xs={12}>
            <TextField
                name={f.name}
                label={f.label}
                value={this.state[f.name]}
                onChange={this.handleInputChange}
                margin="normal"
                className={classes.textField}
            />
        </Grid>
        );
        return(
            <Grid item xs={12} sm={4} className={classes.root}>
                <Paper elevation={4} className={classes.paper}>
                    <Typography type="headline" component="h3">
                        {this.props.title}
                    </Typography>
                    <form>
                        <Grid container spacing={8}>
                            {textFields}
                            <Grid item xs={12}>
                                <Button raised color="primary" onClick={this.handleSend}>Go!</Button>
                            </Grid>
                        </Grid>
                    </form> 
                </Paper> 
            </Grid>
        );
    }
}

export default withStyles(styles)(SimpleForm);