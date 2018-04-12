import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import sender from './sender.js';

const styles = theme => ({
  reset: {
    position: 'fixed',
    bottom: '1rem',
    right:'calc(50% - 56px)'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

const reset_fields = [
  {
    name: 'x',
    label: 'x position'
  },
  {
    name: 'y',
    label: 'y position'
  },
  {
    name: 'theta',
    label: 'rotation'
  },
]

class ResetButton extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        open: false,
        x: 1,
        y: 0,
        theta: 0
      };
      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.resetLocation = this.resetLocation.bind(this);
    }
  
    handleClickOpen = () => {
      sender.reset();
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    handleInputChange = event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    resetLocation = () => {
      sender.resetLocation(
        parseFloat(this.state.x), 
        parseFloat(this.state.y), 
        parseFloat(this.state.theta)
      )
      this.setState({ open:false })
    }
  
    render() {
      const { classes } = this.props;
      const textFields = reset_fields.map(f =>
        <TextField
          name={f.name}
          label={f.label}
          value={this.state[f.name]}
          onChange={this.handleInputChange}
          margin="normal"
          className={classes.textField}
          key={f.name}
        />
    );
      return (
        <div>
          <Button variant="fab" color="secondary" aria-label="reset" size='large' className={classes.reset} onClick={this.handleClickOpen}>
            Do not press
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Reset Position</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Also want to reset your position? Do it now.
              </DialogContentText>
              {textFields}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.resetLocation} color="primary">
                Reset
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
  
  export default withStyles(styles)(ResetButton);