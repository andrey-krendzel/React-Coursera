import React, { Component } from 'react';
import { Media } from 'reactstrap';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component{

    
    constructor(props) {
        super(props);
        this.state = { 
          selectedDish: null,

    }


    console.log('Menu constructor is involved')
  }

  onDishSelect(dish){
    this.setState({selectedDish:dish});
    
  }

  renderDish(dish){

    if (dish != null){
     
    return(
      <div className="row">
        <div className="col-12 col-sm-12 col-md-5 m-1 col-lg-5">
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>

<div className="col-12 col-sm-12 col-md-5 m-1 col-lg-5">
{this.renderComments(dish)}

</div>
</div>
    );}
    else {
      return(
        <div></div>
      );
    }
  }

  renderComments(dish){
   
    const eachComment = dish.comments.map((comment) => {
      return(
        <li>{comment.comment}
        <br /><br />
        -- {comment.author}, {comment.date}
        <br /><br /></li>
      )})

    return(
      <div>
      <h4><b>Comments</b></h4>
      <ul class="list-unstyled">
        {eachComment}
      </ul>
      </div>
    )
    
    }

  render() {

    

    const card = this.props.dishes.map((dish) => {
        return(
          
            <div key={dish.id} className="col-12 col-sm-12 col-md-5 m-1 col-lg-5">
        <Card onClick={() => this.onDishSelect(dish)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
      </div>


        
        );

    });

   return(
        <div className="container">
           <div className="row"> 
             {card}
             
             </div>
             
            {this.renderDish(this.state.selectedDish)}
            
        </div>
    
   )}

  }
export default DishDetail;