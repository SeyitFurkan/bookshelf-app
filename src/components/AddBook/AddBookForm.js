import React from "react";
import {connect} from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import { Formik } from "formik";
import {categories, ratings, statuses} from "../../constants";
import {addBook, editBook} from "../../state/ducks/books/action";
import * as Yup from "yup";
import {withRouter} from "react-router";


const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is a required field"),
    author: Yup.string().required("Author is a required field"),
    review: Yup.string().min(30, "30 karakterden az giremezsiniz")
});

const AddBookForm = (props) => {
    console.log(props);
    let initialValues = {
        title: "",
        author: "",
        category: "JavaScript",
        description: "",
        rating: "5",
        imageUrl: "",
        status: "Not Read",
        review: ""
    };
    if(props.isEdit && props.book){
        /// review var mi - Object.keys().indexOf("review") > -1
        initialValues = {...props.book};
    }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            console.log(values);
            if(props.isEdit){
                props.editBook(props.book.id, values, props.history);
            }else{
                props.addBook(values, props.history);
            }
        }}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          url
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Name of the book"
                value={values.title}
                onChange={handleChange}
                invalid={errors.title}
              />
                {
                    errors.title && <FormFeedback>{errors.title}</FormFeedback>
                }
            </FormGroup>
            <FormGroup>
              <Label for="author">Author</Label>
              <Input
                type="text"
                name="author"
                id="author"
                placeholder="Author of the book"
                value={values.author}
                onChange={handleChange}
                invalid={errors.author}
              />
                {
                    errors.author && <FormFeedback>{errors.author}</FormFeedback>
                }
            </FormGroup>
            <FormGroup>
              <Label for="imageUrl">Image URL</Label>
              <Input
                type="text"
                name="imageUrl"
                id="imageUrl"
                placeholder="Image of the book"
                value={values.imageUrl}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Category</Label>
              <Input type="select" name="category" id="category" value={values.category} onChange={handleChange}>
                {categories.map((category) => {
                  return <option>{category}</option>;
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Description</Label>
              <Input type="textarea" name="description" id="description" value={values.description}
                     onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Rating</Label>
              <Input type="select" name="rating" id="rating" value={values.rating} onChange={handleChange}>
                {ratings.map((score) => {
                  return <option>{score}</option>;
                })}
              </Input>
            </FormGroup>
              <FormGroup>
                  <Label for="exampleSelect">Status</Label>
                  <Input type="select" name="status" id="status" value={values.status} onChange={handleChange}>
                      {statuses.map((status) => {
                          return <option>{status}</option>;
                      })}
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="review">Review</Label>
                  <Input type="textarea" name="review" id="review" value={values.review} onChange={handleChange} invalid={errors.review}/>
                  {
                      errors.review && <FormFeedback>{errors.review}</FormFeedback>
                  }
              </FormGroup>
              <FormGroup>
                <Label for="exampleUrl">Good Read Link</Label>
                <Input type="url" name="url" id="url" value={values.url} onChange={handleChange} />
              </FormGroup>
              {
                  props.isEdit ?
                      <Button color="primary">Save</Button> : <Button color="primary">Add</Button>
              }

          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
    addBook: addBook,
    editBook: editBook
};

export default withRouter(connect(null, mapDispatchToProps)(AddBookForm));
