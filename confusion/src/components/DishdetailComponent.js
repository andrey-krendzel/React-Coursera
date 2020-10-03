import React, { Component } from 'react';
import { Media } from 'reactstrap';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
  import { Control, LocalForm, Errors, actions } from 'react-redux-form';
  import { addComment } from '../redux/ActionCreators';
  import { Loading } from './LoadingComponent';
  import { baseUrl } from '../shared/baseUrl';
  import { FadeTransform, Fade, Stagger } from 'react-animation-components';





  const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

  function RenderDish({dish}){

  
    return(
    
        <div className="col-12 col-sm-12 col-md-5 m-1 col-lg-5 col-xl-5">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        </div>


    );
  }

  function RenderComments({comments, postComment, dishId}) {
  
   

    return(
      <div>
      <h4><b>Comments</b></h4>
      <ul class="list-unstyled">
      <Stagger in>
                        {comments.comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
      </ul>
      <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    )
    
    }

  

  const DishDetail = (props) => {

    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (props.dish != null){

         addComment(props.dishId);
 

   return(
        <div className="container">
          <div className="row">
          
          <RenderDish dish={props.dish}  />

          <div className="col-12 col-sm-12 col-md-5 m-1 col-lg-5 col-xl-5">
          <RenderComments comments={props.comments}
        postComment={props.postComment}
        dishId={props.dish.id}
      />
          

        </div>

            
        </div>
        </div>
    
   );
  }
  }

   class CommentForm extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        isModalOpen: false,
        author: '',
        touched: {
          author:false
      }
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }



    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

    handleSubmit(values) {
      console.log('Current State is: ' + JSON.stringify(values));
      alert('Current State is: ' + JSON.stringify(values));
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
      // event.preventDefault();
  }




    render(){

    

    return(
      <div>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
      <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
      <ModalBody>
      
      <LocalForm  onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                       
                                        className="form-control"
                                         >

                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                            </Control.select>
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                       
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />

                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                       rows="6"
                                        className="form-control"
                                        
                                         />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
      </LocalForm>



      </ModalBody>
  </Modal>
    <Button outline onClick={this.toggleModal}><span className="fa fa-reply fa-lg"></span> Submit Comment</Button>
    </div>
    );

    }
  }
  
  
export default DishDetail;