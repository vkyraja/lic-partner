import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { mapDispatchToProps } from '../utils';
import './styles/userForm.css';

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: 'us',
            stateVal: 'ma',
            city: 'belmont'
        };
    }

    getUserMapData = () => {
        this.props.actions.getUserMapData({
            country: this.state.country,
            state: this.state.stateVal,
            city: this.state.city
        });
    };

    renderMapContainer = (userMapData) => {
        const mapCenter = userMapData.places[0];
        return (
            <Row>
                <MapContainer center={[mapCenter.latitude, mapCenter.longitude]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userMapData.places.map((data, idx) => {
                        return (
                            <Marker key={idx} position={[data.latitude, data.longitude]}>
                                <Popup>{data['place name']} - {data['post code']}</Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </Row>
        );
    };

    onInputChange = (key, value) => {
        this.setState({ [key]: value });
    };

    render() {
        const { userData } = this.props;
        return (
            <Container fluid className='user-map-container'>
                <Row className='user-map-form'>
                    <Col>
                        <Form>
                            <Form.Group controlId="form.country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Country"
                                    value={this.state.country}
                                    onChange={(e) => this.onInputChange('country', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="form.state">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="State"
                                    value={this.state.stateVal}
                                    onChange={(e) => this.onInputChange('stateVal', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="form.city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={this.state.city}
                                    onChange={(e) => this.onInputChange('city', e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={() => this.getUserMapData()}>Get Map Data</Button>
                        </Form>
                    </Col>
                    <Col>
                        <Container className='user-map-data'>
                            {(userData && userData.userMapData) && <textarea className='map-data' value={JSON.stringify(userData.userMapData, undefined, 4)} readOnly></textarea>}
                            {(userData && userData.userMapDataError) && <Alert variant='danger'>Error in getting User map data!</Alert>}
                            {((!userData || !userData.userMapData) && !userData.userMapDataError) && <Alert variant='info'>No data received to show!</Alert>}
                        </Container>
                    </Col>
                </Row>
                {(userData && userData.userMapData) && this.renderMapContainer(userData.userMapData)}
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userFormReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
