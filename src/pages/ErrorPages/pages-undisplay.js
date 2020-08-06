import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

//Images
import error from '../../images/error.png';

class PageUnDisplay extends Component {
    render() {

        return (
            <React.Fragment>
                <div className="ex-pages">
                    <div className="content-center">
                        <div className="content-desc-center">
                            <Container>
                                <Card className="mo-mt-2">
                                    <CardBody>
                                        <Row className="align-items-center">
                                            <Col lg={{ size: 4, offset: 1 }}>
                                                <div className="ex-page-content">
                                                    {/* <h1 className="text-dark">403!</h1> */}
                                                    <h4 className="mb-4">Sorry, UnAuthorized Display Board</h4>
                                                    <p className="mb-5">
                                                        You are Not Authorized to View This Display Board
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col lg={{ size: 5, offset: 1 }}>
                                                <img src={error} alt="" className="img-fluid mx-auto d-block" />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Container>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PageUnDisplay;
