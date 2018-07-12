import React from 'react';
import {connect} from 'react-redux'; 
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import {findDOMNode} from 'react-dom';
import {postItem} from './../../actions/itemActions';

class ItemsForm extends React.Component {

    handleSubmit() {
        const item = [{
            title: findDOMNode(this.refs.title).nodeValue,
            description: findDOMNode(this.refs.description).nodeValue,
            price: findDOMNode(this.refs.price).nodeValue,
        }]
        this.props.postItem(item);
    }

    render() {
        return(
            <Well>
                <Panel>
                    <FormGroup controlId = "title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl 
                            type = "text"
                            placeholder = "Enter Title"
                            ref = "title" />
                    </FormGroup>
                    <FormGroup controlId = "description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl 
                        type = "text"
                        placeholder = "Enter Description"
                        ref = "description" />
                </FormGroup>
                <FormGroup controlId = "price">
                <ControlLabel>Price</ControlLabel>
                <FormControl 
                    type = "text"
                    placeholder = "Enter Price"
                    ref = "price" />
            </FormGroup>
            <Button onClick = {this.handleSubmit.bind(this)} bsStyle = "primary">Save Item</Button>
                </Panel>
            </Well>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postItem}, dispatch)
}

export default connect(null, mapDispatchToProps)(ItemsForm);