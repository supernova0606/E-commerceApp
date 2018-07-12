import React from 'react';
import {connect} from 'react-redux'; 
import {Grid, Col, Row, Button} from 'react-bootstrap'; 
import {getItems} from '../../actions/itemActions';
import Item from './item';
import ItemsForm from './itemsForm';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/2.9/node_modules/redux';
import Cart from './cart';

class ItemList extends React.Component {
    componentDidMount() {
        this.props.getItems();
    }
    render() {
        const itemList = this.props.items.map(function(itemsArr) {
            return(
                <Col xs = {12} sm = {6} md = {4} key = {itemsArr._id}>
                    <Item 
                        _id = {itemsArr._id}
                        title = {itemsArr.title}
                        description = {itemsArr.description}
                        price = {itemsArr.price}/>
                </Col>
            )
        })
        console.log('Here is the state', this.props.items);
        return(
            <Grid>
                <Row>  
                    <Cart />
                </Row>
                <Row>
                    <Col xs = {12} sm = {6}>
                    <ItemsForm />
                    </Col>
                    {itemList}
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.items.items 
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getItems: getItems}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);