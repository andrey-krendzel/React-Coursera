import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { Media } from 'reactstrap';

const RenderLeader = (props) => {



return(

              <Media list>
              <div key={props.leader.id} className="col-12 mt-5">
            <Media tag="li">
              <Media left middle>
                  <Media object src={props.leader.image} alt={props.leader.name} />
              </Media>
              <Media body className="ml-5">
                <Media heading>{props.leader.name}</Media>
                <p>{props.leader.designation}</p>
                <p>{props.leader.description}</p>
              </Media>
            </Media>
          </div>
              </Media>

);

}




export default RenderLeader;