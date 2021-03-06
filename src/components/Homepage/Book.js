import React from 'react';
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardLink } from "reactstrap";
import {StyledBookCard} from "./BookStyles";
import {Link} from "react-router-dom";

const Book = (props) => {
    const {imageUrl, rating, title, id, url, review} = props;
    return (
            <StyledBookCard>
                <CardImg top width="100%" src={imageUrl} alt={title} />
                <CardBody>
                    <CardText>
                        <strong>{'${rating} / 5'}</strong>
                    </CardText>
                    <CardText>
                        {title}
                    </CardText>
                    <CardLink>
                        Details
                    </CardLink>
                    <CardText>
                        Review: {review}
                    </CardText>
                    <CardLink>
                        <a target="_blank" href ={url} > Goodreads Link: </a>
                    </CardLink>
                    <CardLink>
                        <Link to={'/edit-book/${id}'}>Edit Book</Link>
                    </CardLink>
                </CardBody>
            </StyledBookCard>
    );
};

export default Book;