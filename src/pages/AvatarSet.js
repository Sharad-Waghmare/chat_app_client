import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { fetchAvatars, setAvatarImage } from '../store/Avatar/Action';


const AvatarSet = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const { avatars, isLoading, error } = useSelector(state => state.avatar);

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        dispatch(fetchAvatars());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'bottom-right', autoClose: 8000, pauseOnHover: true, draggable: true, theme: 'dark' });
        }
    }, [error]);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const setProfilePic = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            dispatch(setAvatarImage(user._id, avatars[selectedAvatar]));
        }
    };

    return (
        <>
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#131324' }}>
                <Row className="mb-4">
                    <Col className="text-center">
                        <h1 className="text-white">Pick an Avatar as your profile picture.</h1>
                    </Col>
                </Row>
                <Row className="mb-4">
                    {avatars.map((avatar, ind) => (
                        <Col key={ind} xs={6} md={3} className="d-flex justify-content-center">
                            <Card className={`avatar ${selectedAvatar === ind ? "border-primary" : ""}`} onClick={() => setSelectedAvatar(ind)} style={{ cursor: 'pointer', borderRadius: '50%', overflow: 'hidden' }}>
                                <Card.Img variant="top" src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Button onClick={setProfilePic} variant="primary" size="lg" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Set as Profile Picture'}
                </Button>
            </Container>
            <ToastContainer />
        </>
    );
};

export default AvatarSet;
