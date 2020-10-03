import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent.js';
import { Loading } from './LoadingComponent';


  function RenderMenuItem({dish, onClick, comments, postComment}) {
   
      return(
       
        <DishDetail dish={dish} comments={comments} postComment={postComment} />
      );
}

const Menu = (props) => {



 
    const menu = props.dishes.dishes.map((dish) => {
      return (
          <div className="col-12 col-sm-12 col-md-12 m-1 col-lg-12 col-xl-12 m-1"  key={dish.id}>
              <RenderMenuItem dish={dish} comments={props.comments} postComment={props.postComment}  />
          </div>
      );
  });

  if (props.dishes.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.dishes.errMess) {
    return(
        <div className="container">
            <div className="row"> 
                <div className="col-12">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        </div>
    );
}
else {

  return (
      <div className="container">
          <div className="row">
              {menu}
          </div>
      </div>
  );
}
}


export default Menu;