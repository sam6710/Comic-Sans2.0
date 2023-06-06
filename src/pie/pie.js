import React from 'react';
import './pie.css';

function Pie(){

    

    return(
        <footer className="text-center text-lg-start bg-light text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
                </div>
                <div>
                    <a href="" className="me-4 text-reset"><i className="fab fa-facebook-f"></i></a>
                    <a href="" className="me-4 text-reset"><i className="fab fa-twitter"></i></a>
                    <a href="" className="me-4 text-reset"><i className="fab fa-google"></i></a>
                    <a href="" className="me-4 text-reset"><i className="fab fa-instagram"></i></a>
                    <a href="" className="me-4 text-reset"><i className="fab fa-linkedin"></i></a>
                    <a href="" className="me-4 text-reset"><i className="fab fa-github"></i></a>
                </div>
            </section>

            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4"><i className="fas fa-gem me-3"></i>Comic-Sans</h6>
                            <p>Tienda online de comics, manga y novelas ligeras de todo tipo y de todas las editoriales.</p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Información</h6>
                            <p><a href="#!" className="text-reset">Angular</a></p>
                            <p><a href="#!" className="text-reset">React</a></p>
                            <p><a href="#!" className="text-reset">Vue</a></p>
                            <p><a href="#!" className="text-reset">Laravel</a></p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Avisos</h6>
                            <p><a href="#!" className="text-reset">Yee</a></p>
                            <p><a href="#!" className="text-reset">Settings</a></p>
                            <p><a href="#!" className="text-reset">Orders</a></p>
                            <p><a href="#!" className="text-reset">Help</a></p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                            <p><i className="fas fa-home me-3"></i> Granada, GR 18004, ES</p>
                            <p><i className="fas fa-envelope me-3"></i>Comic-sans@gmail.com</p>
                            <p><i className="fas fa-phone me-3"></i>(+34)765543321</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4">
                © 2023 Copyright:
                <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
        </footer>
    );
};

export default Pie;