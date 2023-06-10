import React from 'react';
import './pie.css';

function Pie(){

    

    return(
        <footer className="text-center text-lg-start bg-light text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                <span>Mantente informado a través de nuestras redes sociales:</span>
                </div>
                <div>
                    <a href="https://twitter.com/home" className="me-4 text-reset" target='_blank'><i className="fab fa-twitter"></i></a>
                    <a href="https://www.google.es" className="me-4 text-reset" target='_blank'><i className="fab fa-google"></i></a>
                    <a href="https://www.instagram.com" className="me-4 text-reset" target='_blank'><i className="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/samuel-gómez-pérez-23269323a/" className="me-4 text-reset" target='_blank'><i className="fab fa-linkedin"></i></a>
                    <a href="https://github.com/sam6710" className="me-4 text-reset" target='_blank'><i className="fab fa-github"></i></a>
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
                            <p><a href="#!" className="text-reset">Javascript</a></p>
                            <p><a href="#!" className="text-reset">React</a></p>
                            <p><a href="#!" className="text-reset">Firebase</a></p>
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
                <a className="text-reset fw-bold" href="https://github.com/sam6710">Samuel Gómez Pérez</a>
            </div>
        </footer>
    );
};

export default Pie;