import React from 'react';
import {connect} from 'react-redux'; 
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import {findDOMNode} from 'react-dom';
import {postItem, deleteItem} from './../../actions/itemActions';

class ItemsForm extends React.Component {

    handleSubmit() {
        const item = [{
            title: findDOMNode(this.refs.title).nodeValue,
            description: findDOMNode(this.refs.description).nodeValue,
            price: findDOMNode(this.refs.price).nodeValue,
        }]
        this.props.postItem(item);
    }

    onDelete() {
        let itemID = findDOMNode(this.refs.delete).value

        this.props.deleteItem(itemID);
    }

    render() {
        const itemList = this.props.items.map(function(itemsArr) {
            return (
                <option key = {itemsArr._id}> {itemsArr._id}</option>
            )
        })

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
                <Panel style = {{marginTop: '25px'}}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select a book id to delete</ControlLabel>
                        <FormControl componentClass = "delete" componentClass = "select" placeholder = "select">
                        <option value="select">select</option>
                            {itemList}
                        </FormControl>
                    </FormGroup>
                    <Button  onClick = {this.onDelete.bind(this)} bsStyle = "danger">Delete Item</Button>
                </Panel>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.items.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postItem, 
    deleteItem
}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsForm);